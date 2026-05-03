"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import LoginOptions from "@/components/auth/LoginOptions";
import ProfileSetup from "@/components/auth/ProfileSetup";
import { useAppStore } from "@/store/useAppStore";

export default function LoginPage() {
  const router = useRouter();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const profile = useAppStore((state) => state.profile);
  const login = useAppStore((state) => state.login);
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
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center gap-6 px-4 py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-zinc-900">Custom Greetings App</h1>
        <p className="text-sm text-zinc-600">
          Login, choose a template, personalize your card, and share it instantly.
        </p>
      </div>

      {!isAuthenticated ? (
        <LoginOptions
          onGoogleLogin={() => {
            login("google");
            void signIn("google", { redirect: false });
          }}
          onEmailLogin={(email) => {
            login("email");
            void signIn("email", { redirect: false, email });
          }}
          onGuestLogin={() => {
            login("guest");
            void signIn("guest", { redirect: false });
          }}
        />
      ) : (
        <ProfileSetup
          defaultName={profile?.name}
          onSubmit={(value) => {
            setProfile(value);
            router.push("/home");
          }}
        />
      )}
    </main>
  );
}

