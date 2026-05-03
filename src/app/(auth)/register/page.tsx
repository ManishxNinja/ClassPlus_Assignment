"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();
  const { update } = useSession();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:py-0">
      <div className="mb-10 max-w-xl space-y-5 lg:mb-0">
        <p className="inline-flex rounded-full bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-800 ring-1 ring-violet-200/80">
          New account
        </p>
        <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
          Join the studio
        </h1>
        <p className="text-base leading-relaxed text-zinc-600">
          We store your email, a hashed password, and your display name and profile photo in Neon via Prisma.
        </p>
      </div>

      <div className="flex w-full flex-col items-stretch lg:max-w-md">
        {error && (
          <p className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
        )}
        <RegisterForm
          busy={busy}
          onSubmit={async (data) => {
            setError(null);
            setBusy(true);
            const res = await fetch("/api/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: data.email,
                password: data.password,
                name: data.name,
                imageDataUrl: data.imageDataUrl,
              }),
            });
            const body = (await res.json().catch(() => ({}))) as { error?: string };
            if (!res.ok) {
              setError(body.error ?? "Registration failed.");
              setBusy(false);
              return;
            }
            const signInRes = await signIn("credentials", {
              redirect: false,
              email: data.email,
              password: data.password,
            });
            setBusy(false);
            if (signInRes?.error) {
              setError("Account created but sign-in failed. Try logging in.");
              return;
            }
            await update();
            router.replace(data.imageDataUrl ? "/home" : "/login");
          }}
        />
      </div>
    </main>
  );
}
