"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";

interface RegisterFormProps {
  onSubmit: (data: {
    email: string;
    password: string;
    name: string;
    imageDataUrl: string | null;
  }) => void | Promise<void>;
  busy?: boolean;
}

export default function RegisterForm({ onSubmit, busy }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

  return (
    <Card className="w-full max-w-md">
      <form
        className="space-y-5"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const data = new FormData(form);
          const email = String(data.get("email") ?? "").trim().toLowerCase();
          const password = String(data.get("password") ?? "");
          const trimmedName = name.trim();
          if (!email || !password || !trimmedName) return;
          await onSubmit({
            email,
            password,
            name: trimmedName,
            imageDataUrl,
          });
        }}
      >
        <div>
          <h2 className="font-display text-2xl font-semibold text-zinc-900">Create account</h2>
          <p className="mt-1 text-sm text-zinc-600">Your name and photo are saved to your account.</p>
        </div>

        <div className="space-y-1">
          <label htmlFor="reg-email" className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="reg-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-xl border border-zinc-200 bg-white/90 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-muted)]"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="reg-password" className="text-sm font-medium text-zinc-700">
            Password (min 8 characters)
          </label>
          <input
            id="reg-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className="w-full rounded-xl border border-zinc-200 bg-white/90 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-muted)]"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="reg-name" className="text-sm font-medium text-zinc-700">
            Display name
          </label>
          <input
            id="reg-name"
            name="displayName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. Alex"
            className="w-full rounded-xl border border-zinc-200 bg-white/90 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-muted)]"
          />
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium text-zinc-700">Profile photo (optional)</span>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300/90 bg-gradient-to-b from-white/90 to-violet-50/40 px-4 py-8 transition hover:border-violet-400/80">
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => setImageDataUrl(String(reader.result ?? ""));
                reader.readAsDataURL(file);
              }}
            />
            {imageDataUrl ? (
              <img
                src={imageDataUrl}
                alt="Profile preview"
                className="h-24 w-24 rounded-full object-cover shadow-lg ring-4 ring-white"
              />
            ) : (
              <>
                <span className="text-sm font-medium text-violet-700">Drop or click to upload</span>
                <span className="mt-1 text-xs text-zinc-500">You can add this later in settings</span>
              </>
            )}
          </label>
        </div>

        <Button type="submit" variant="primary" disabled={busy} className="w-full py-3 text-[15px]">
          {busy ? "Creating account…" : "Register"}
        </Button>

        <p className="text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-violet-700 underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </Card>
  );
}
