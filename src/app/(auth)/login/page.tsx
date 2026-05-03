"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import EmailLogin from "@/components/auth/EmailLogin";
import ProfileSetup from "@/components/auth/ProfileSetup";
import { useAppStore } from "@/store/useAppStore";

export default function LoginPage() {
  const router = useRouter();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const profile = useAppStore((state) => state.profile);
  const lastUsedEmail = useAppStore((state) => state.lastUsedEmail);
  const login = useAppStore((state) => state.login);
  const setLastUsedEmail = useAppStore((state) => state.setLastUsedEmail);
  const setProfile = useAppStore((state) => state.setProfile);
  const setHydrated = useAppStore((state) => state.setHydrated);

  useEffect(() => {
    setHydrated(true);
  }, [setHydrated]);

  useEffect(() => {
    if (isAuthenticated && profile) {
      router.replace("/home");
    }
  }, [isAuthenticated, profile, router]);

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
          Sign in with email, add your name and photo, then layer them onto beautiful templates and share
          the finished card in one tap.
        </p>
        <ul className="flex flex-wrap gap-3 text-sm text-zinc-600">
          <li className="rounded-full bg-white/60 px-3 py-1 ring-1 ring-white/80">Live preview on every card</li>
          <li className="rounded-full bg-white/60 px-3 py-1 ring-1 ring-white/80">Premium unlock flow</li>
          <li className="rounded-full bg-white/60 px-3 py-1 ring-1 ring-white/80">Share merged PNG</li>
        </ul>
      </div>

      <div className="flex w-full flex-col items-stretch lg:max-w-md">
        {!isAuthenticated ? (
          <EmailLogin
            key={lastUsedEmail ?? "no-saved-email"}
            defaultEmail={lastUsedEmail ?? undefined}
            onEmailLogin={async (email) => {
              setLastUsedEmail(email);
              const res = await signIn("email", { redirect: false, email });
              if (!res?.ok) return;
              login();
              const saved = useAppStore.getState().profile;
              if (saved?.name?.trim() && saved.imageDataUrl) {
                router.replace("/home");
              }
            }}
          />
        ) : (
          <ProfileSetup
            defaultName={profile?.name}
            defaultImageDataUrl={profile?.imageDataUrl}
            onSubmit={(value) => {
              setProfile(value);
              router.push("/home");
            }}
          />
        )}
      </div>
    </main>
  );
}
