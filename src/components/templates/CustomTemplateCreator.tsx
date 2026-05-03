"use client";

import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import type { GreetingTemplate } from "@/types/template";

const MAX_BYTES = 2.5 * 1024 * 1024;

interface CustomTemplateCreatorProps {
  onCreated: (template: GreetingTemplate) => void;
}

export default function CustomTemplateCreator({ onCreated }: CustomTemplateCreatorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("My custom card");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function handleFile(file: File | undefined) {
    setError(null);
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, WebP, or GIF).");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError(`Use an image under ${Math.round(MAX_BYTES / (1024 * 1024))} MB so it fits in browser storage.`);
      return;
    }

    setBusy(true);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result ?? "");
      const template: GreetingTemplate = {
        id: `custom-${Date.now()}`,
        title: title.trim() || "My custom card",
        category: "Custom",
        imageUrl: dataUrl,
        premium: false,
      };
      onCreated(template);
      setTitle("My custom card");
      if (inputRef.current) inputRef.current.value = "";
      setBusy(false);
    };
    reader.onerror = () => {
      setError("Could not read that file.");
      setBusy(false);
    };
    reader.readAsDataURL(file);
  }

  return (
    <Card className="overflow-hidden border-violet-200/80 bg-gradient-to-br from-white/95 to-violet-50/40">
      <div className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-violet-700">Custom template</p>
        <h3 className="font-display text-lg font-semibold text-zinc-900">Use your own background</h3>
        <p className="max-w-2xl text-sm text-zinc-600">
          Upload a photo or design — it will appear under <strong>Custom</strong> with the same overlays and export as
          built-in templates. Square images (e.g. 1080×1080) work best.
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="flex min-w-[14rem] flex-1 flex-col gap-1">
          <span className="text-xs font-medium text-zinc-700">Card title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My custom card"
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-zinc-900/5 focus:border-[var(--primary)] focus:ring-4 focus:ring-[var(--primary-muted)]"
          />
        </label>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          className="sr-only"
          id="custom-template-file"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <Button
          type="button"
          variant="primary"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="w-full shrink-0 sm:w-auto"
        >
          {busy ? "Adding…" : "Choose image & add to gallery"}
        </Button>
      </div>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
    </Card>
  );
}
