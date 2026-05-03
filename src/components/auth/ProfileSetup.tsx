"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface ProfileSetupProps {
  defaultName?: string;
  defaultImageDataUrl?: string;
  busy?: boolean;
  onSubmit: (value: { name: string; imageDataUrl: string }) => void;
}

export default function ProfileSetup({
  defaultName,
  defaultImageDataUrl,
  busy = false,
  onSubmit,
}: ProfileSetupProps) {
  const [name, setName] = useState(defaultName ?? "");
  const [imageDataUrl, setImageDataUrl] = useState(defaultImageDataUrl ?? "");

  useEffect(() => {
    if (defaultName) setName(defaultName);
  }, [defaultName]);

  useEffect(() => {
    if (defaultImageDataUrl) setImageDataUrl(defaultImageDataUrl);
  }, [defaultImageDataUrl]);

  const canContinue = Boolean(name.trim() && imageDataUrl);

  return (
    <Card className="w-full max-w-md">
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-semibold text-zinc-900">Your profile</h2>
          <p className="mt-1 text-sm text-zinc-600">
            This name and photo appear on every template preview and on your exported card.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="display-name" className="text-sm font-medium text-zinc-700">
            Display name
          </label>
          <input
            id="display-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Alex"
            className="w-full rounded-xl border border-zinc-200 bg-white/90 px-4 py-3 text-sm text-zinc-900 outline-none ring-zinc-900/5 transition placeholder:text-zinc-400 focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-muted)]"
          />
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium text-zinc-700">Profile photo</span>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300/90 bg-gradient-to-b from-white/90 to-violet-50/40 px-4 py-10 transition hover:border-violet-400/80 hover:from-white hover:to-violet-50/80">
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
                <span className="mt-1 text-xs text-zinc-500">PNG or JPG, square photos work best</span>
              </>
            )}
          </label>
        </div>

        <Button
          type="button"
          variant="primary"
          disabled={!canContinue || busy}
          onClick={() => onSubmit({ name: name.trim(), imageDataUrl })}
          className="w-full py-3 text-[15px]"
        >
          {busy ? "Saving…" : "Continue to templates"}
        </Button>
      </div>
    </Card>
  );
}
