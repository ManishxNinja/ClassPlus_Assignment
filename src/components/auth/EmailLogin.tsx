"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface EmailLoginProps {
  defaultEmail?: string;
  onEmailLogin: (email: string) => void;
}

export default function EmailLogin({ defaultEmail, onEmailLogin }: EmailLoginProps) {
  return (
    <Card className="w-full max-w-md">
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const data = new FormData(form);
          const email = String(data.get("email") ?? "").trim();
          if (email) onEmailLogin(email);
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
          <p className="text-xs text-zinc-500">
            We use email only to personalize your session on this device (demo — no mailbox verification).
          </p>
        </div>
        <Button type="submit" variant="primary" className="w-full py-3 text-[15px]">
          Continue with email
        </Button>
      </form>
    </Card>
  );
}
