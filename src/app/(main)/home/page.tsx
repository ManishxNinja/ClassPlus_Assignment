"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import UpsellModal from "@/components/premium/UpsellModal";
import AuthGate from "@/components/shared/AuthGate";
import Button from "@/components/ui/Button";
import CustomTemplateCreator from "@/components/templates/CustomTemplateCreator";
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
  const userTemplates = useAppStore((state) => state.userTemplates);
  const addUserTemplate = useAppStore((state) => state.addUserTemplate);
  const removeUserTemplate = useAppStore((state) => state.removeUserTemplate);
  const [showUpsell, setShowUpsell] = useState(false);

  const profileName = profile?.name ?? "Creator";
  const profileImage = profile?.imageDataUrl ?? "/avatar-placeholder.svg";

  const allTemplates = useMemo(() => [...TEMPLATES, ...userTemplates], [userTemplates]);

  const premiumCount = useMemo(
    () => TEMPLATES.filter((template) => template.premium).length,
    [],
  );

  return (
    <AuthGate>
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
        <header className="flex flex-col gap-6 rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_24px_60px_-20px_rgba(91,33,182,0.15)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <img
              src={profileImage}
              alt=""
              className="h-14 w-14 shrink-0 rounded-2xl object-cover shadow-md ring-2 ring-white"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-700">Template studio</p>
              <h1 className="font-display text-2xl font-semibold text-zinc-900 sm:text-3xl">
                Hello, {profileName}
              </h1>
              <p className="mt-1 max-w-lg text-sm leading-relaxed text-zinc-600">
                Tap a card to edit and export, or upload your own background under Custom. Premium designs stay locked
                until you upgrade.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <span
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide ${
                isPremium
                  ? "bg-gradient-to-r from-amber-200 to-orange-200 text-amber-950 ring-1 ring-amber-300/80"
                  : "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200/80"
              }`}
            >
              {isPremium ? "Premium active" : `${premiumCount} premium picks`}
            </span>
            <Button
              variant="outline"
              onClick={async () => {
                await signOut({ redirect: false });
                logout();
                router.replace("/login");
              }}
              className="px-5"
            >
              Sign out
            </Button>
          </div>
        </header>

        <CustomTemplateCreator
          onCreated={(template) => {
            addUserTemplate(template);
            setSelectedCategory("Custom");
          }}
        />

        <section className="space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold text-zinc-900">Browse templates</h2>
              <p className="text-sm text-zinc-600">Filters apply instantly; overlays use your profile.</p>
            </div>
          </div>
          <CategoryTabs
            selectedCategory={selectedCategory}
            onChange={(category) => setSelectedCategory(category)}
          />
        </section>

        <TemplateGrid
          templates={allTemplates}
          selectedCategory={selectedCategory}
          userName={profileName}
          profileImage={profileImage}
          onRemoveCustom={removeUserTemplate}
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
