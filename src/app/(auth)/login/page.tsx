"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import LoginForm from "@/components/auth/LoginForm";
import ProfileSetup from "@/components/auth/ProfileSetup";
import { useSessionProfile } from "@/hooks/useSessionProfile";
import { useAppStore } from "@/store/useAppStore";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const { hasProfileForEditor } = useSessionProfile();
  const lastUsedEmail = useAppStore((state) => state.lastUsedEmail);
  const setLastUsedEmail = useAppStore((state) => state.setLastUsedEmail);
  const setHydrated = useAppStore((state) => state.setHydrated);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);
  }, [setHydrated]);

  useEffect(() => {
    if (status === "authenticated" && hasProfileForEditor) {
      router.replace("/home");
    }
  }, [status, hasProfileForEditor, router]);

  const needProfile = status === "authenticated" && !hasProfileForEditor;

  if (status === "loading") {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-violet-200 border-t-violet-600" />
      </main>
    );
  }

  if (status === "authenticated" && hasProfileForEditor) {
    return null;
  }

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:py-0">
      <div className="mb-10 max-w-xl space-y-5 lg:mb-0">
        <p className="inline-flex rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-800 ring-1 ring-violet-200/80">
          Custom wishes · Web app
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
          Greetings that feel{" "}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            truly yours
          </span>
          .
        </h1>
        <p className="text-base leading-relaxed text-zinc-600">
          Create an account with email and password, add your name and photo, then layer them onto beautiful templates
          and share the finished card in one tap.
        </p>
      </div>

      <div className="flex w-full flex-col items-stretch lg:max-w-md">
        {formError && (
          <p className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{formError}</p>
        )}

        {needProfile ? (
          <ProfileSetup
            busy={busy}
            defaultName={session?.user?.name ?? undefined}
            defaultImageDataUrl={session?.user?.image ?? undefined}
            onSubmit={async (value) => {
              setFormError(null);
              setBusy(true);
              const res = await fetch("/api/me/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: value.name,
                  imageDataUrl: value.imageDataUrl,
                }),
              });
              setBusy(false);
              if (!res.ok) {
                setFormError("Could not save profile. Try again.");
                return;
              }
              await update();
              router.replace("/home");
            }}
          />
        ) : (
          <LoginForm
            key={lastUsedEmail ?? "no-saved-email"}
            defaultEmail={lastUsedEmail ?? undefined}
            busy={busy}
            onSubmit={async (email, password) => {
              setFormError(null);
              setBusy(true);
              setLastUsedEmail(email);
              const res = await signIn("credentials", {
                redirect: false,
                email,
                password,
              });
              setBusy(false);
              if (res?.error) {
                setFormError("Invalid email or password.");
                return;
              }
              if (res?.ok) {
                await update();
              }
            }}
          />
        )}
      </div>
    </main>
  );
}
