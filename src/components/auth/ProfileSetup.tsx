"use client";

import { useState } from "react";

interface ProfileSetupProps {
  defaultName?: string;
  onSubmit: (value: { name: string; imageDataUrl: string }) => void;
}

export default function ProfileSetup({ defaultName, onSubmit }: ProfileSetupProps) {
  const [name, setName] = useState(defaultName ?? "");
  const [imageDataUrl, setImageDataUrl] = useState<string>("");

  const canContinue = Boolean(name.trim() && imageDataUrl);

  return (
    <section className="space-y-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h2 className="text-lg font-semibold text-zinc-900">Set up profile</h2>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Your name"
        className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm"
      />
      <label className="block text-sm text-zinc-700">
        Upload profile photo
        <input
          type="file"
          accept="image/*"
          className="mt-2 block w-full text-sm"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => setImageDataUrl(String(reader.result ?? ""));
            reader.readAsDataURL(file);
          }}
        />
      </label>
      {imageDataUrl ? (
        <img
          src={imageDataUrl}
          alt="Profile preview"
          className="h-16 w-16 rounded-full object-cover ring-2 ring-zinc-200"
        />
      ) : null}
      <button
        type="button"
        disabled={!canContinue}
        onClick={() => onSubmit({ name: name.trim(), imageDataUrl })}
        className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-zinc-400"
      >
        Save profile and continue
      </button>
    </section>
  );
}

