"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";

interface LoginFormProps {
  defaultEmail?: string;
  onSubmit: (email: string, password: string) => void | Promise<void>;
  busy?: boolean;
}

export default function LoginForm({ defaultEmail, onSubmit, busy }: LoginFormProps) {
  return (
    <Card className="w-full max-w-md">
      <form
        className="space-y-5"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const data = new FormData(form);
          const email = String(data.get("email") ?? "").trim();
          const password = String(data.get("password") ?? "");
          if (email && password) await onSubmit(email, password);
        }}
      >
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={defaultEmail ?? ""}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-zinc-200 bg-white/90 px-4 py-3 text-sm text-zinc-900 shadow-inner outline-none ring-zinc-900/10 transition placeholder:text-zinc-400 focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-muted)]"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={8}
            placeholder="••••••••"
            className="w-full rounded-xl border border-zinc-200 bg-white/90 px-4 py-3 text-sm text-zinc-900 shadow-inner outline-none ring-zinc-900/10 transition placeholder:text-zinc-400 focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-muted)]"
          />
        </div>
        <Button type="submit" variant="primary" disabled={busy} className="w-full py-3 text-[15px]">
          {busy ? "Signing in…" : "Sign in"}
        </Button>
        <p className="text-center text-sm text-zinc-600">
          No account?{" "}
          <Link href="/register" className="font-semibold text-violet-700 underline-offset-4 hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </Card>
  );
}
