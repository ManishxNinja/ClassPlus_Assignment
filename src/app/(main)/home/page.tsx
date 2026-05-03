"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import UpsellModal from "@/components/premium/UpsellModal";
import AuthGate from "@/components/shared/AuthGate";
import CategoryTabs from "@/components/templates/CategoryTabs";
import TemplateGrid from "@/components/templates/TemplateGrid";
import { TEMPLATES } from "@/data/templates";
import { useAppStore } from "@/store/useAppStore";

export default function HomePage() {
  const router = useRouter();
  const profile = useAppStore((state) => state.profile);
  const isPremium = useAppStore((state) => state.isPremium);
  const selectedCategory = useAppStore((state) => state.selectedCategory);
  const setSelectedCategory = useAppStore((state) => state.setSelectedCategory);
  const setPremium = useAppStore((state) => state.setPremium);
  const setPendingTemplateId = useAppStore((state) => state.setPendingTemplateId);
  const logout = useAppStore((state) => state.logout);
  const [showUpsell, setShowUpsell] = useState(false);

  const profileName = profile?.name || "Guest";
  const profileImage = profile?.imageDataUrl || "/vercel.svg";

  const premiumCount = useMemo(
    () => TEMPLATES.filter((template) => template.premium).length,
    [],
  );

  return (
    <AuthGate>
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Welcome, {profileName}</h1>
            <p className="text-sm text-zinc-600">
              Pick a template to create and share your greeting.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                logout();
                router.replace("/login");
              }}
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
            >
              Logout
            </button>
            <span className="rounded-xl bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-900">
              {isPremium ? "Premium unlocked" : `${premiumCount} premium templates`}
            </span>
          </div>
        </header>

        <CategoryTabs
          selectedCategory={selectedCategory}
          onChange={(category) => setSelectedCategory(category)}
        />

        <TemplateGrid
          templates={TEMPLATES}
          selectedCategory={selectedCategory}
          userName={profileName}
          profileImage={profileImage}
          onSelectTemplate={(template) => {
            if (template.premium && !isPremium) {
              setPendingTemplateId(template.id);
              setShowUpsell(true);
              return;
            }

            router.push(`/editor/${template.id}`);
          }}
        />
      </main>

      <UpsellModal
        open={showUpsell}
        onClose={() => setShowUpsell(false)}
        onUpgrade={() => {
          setPremium(true);
          setShowUpsell(false);
          const nextTemplateId = useAppStore.getState().pendingTemplateId;
          if (nextTemplateId) {
            setPendingTemplateId(null);
            router.push(`/editor/${nextTemplateId}`);
          }
        }}
      />
    </AuthGate>
  );
}

