"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGate from "@/components/shared/AuthGate";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getTemplateById } from "@/data/templates";
import type { GreetingTemplate } from "@/types/template";
import ShareSheetModal from "@/components/share/ShareSheetModal";
import { composeGreetingImage } from "@/lib/image-composer";
import { useSessionProfile } from "@/hooks/useSessionProfile";
import { useAppStore } from "@/store/useAppStore";

export default function EditorClient({ templateId }: { templateId: string }) {
  const router = useRouter();
  const { name, imageDataUrl, hasProfileForEditor } = useSessionProfile();
  const userTemplates = useAppStore((state) => state.userTemplates);
  const template = useMemo<GreetingTemplate | undefined>(() => {
    return getTemplateById(templateId) ?? userTemplates.find((t) => t.id === templateId);
  }, [templateId, userTemplates]);
  const editor = useAppStore((state) => state.editor);
  const setEditor = useAppStore((state) => state.setEditor);
  const resetEditor = useAppStore((state) => state.resetEditor);
  const [outputDataUrl, setOutputDataUrl] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareBlob, setShareBlob] = useState<Blob | null>(null);

  if (!template || !hasProfileForEditor || !imageDataUrl) {
    return (
      <AuthGate>
        <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-16">
          <Card>
            <p className="text-sm text-zinc-600">
              {!template
                ? "We couldn’t load this template."
                : "Add a profile name and photo to compose your card."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => router.push("/home")}>
                Back to home
              </Button>
              {!hasProfileForEditor && (
                <Button variant="primary" onClick={() => router.push("/login")}>
                  Complete profile
                </Button>
              )}
            </div>
          </Card>
        </main>
      </AuthGate>
    );
  }

  const activeTemplate = template;
  const activeProfile = { name: name.trim() || "Creator", imageDataUrl };

  async function generateImage() {
    setBusy(true);
    try {
      const output = await composeGreetingImage({
        templateUrl: activeTemplate.imageUrl,
        userName: activeProfile.name,
        profileUrl: activeProfile.imageDataUrl,
        ...editor,
      });
      setOutputDataUrl(output.dataUrl);
      return output.blob;
    } finally {
      setBusy(false);
    }
  }

  async function openSharePanel() {
    setBusy(true);
    try {
      const blob = await generateImage();
      setShareBlob(blob);
      setShareOpen(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <AuthGate>
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-700">Editor</p>
            <h1 className="font-display text-3xl font-semibold text-zinc-900">{activeTemplate.title}</h1>
            <p className="mt-1 text-sm text-zinc-600">
              Tune placement, generate a merged PNG, then use <strong>Share card</strong> for WhatsApp, Instagram, and
              more.
            </p>
          </div>
          <Button variant="outline" onClick={() => router.push("/home")} className="shrink-0 self-start sm:self-auto">
            ← All templates
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <Card className="space-y-6">
            <div className="overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-200/80">
              <img src={activeTemplate.imageUrl} alt="" className="aspect-square w-full object-cover" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-zinc-900">Adjust layout</h2>
              <p className="text-xs text-zinc-500">Values are in pixels on a 1080×1080 canvas.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Range label="Name · horizontal" value={editor.textX} min={100} max={980} onChange={(value) => setEditor({ textX: value })} />
                <Range label="Name · vertical" value={editor.textY} min={120} max={980} onChange={(value) => setEditor({ textY: value })} />
                <Range label="Name size" value={editor.textSize} min={24} max={90} onChange={(value) => setEditor({ textSize: value })} />
                <Range label="Photo · horizontal" value={editor.photoX} min={120} max={960} onChange={(value) => setEditor({ photoX: value })} />
                <Range label="Photo · vertical" value={editor.photoY} min={120} max={900} onChange={(value) => setEditor({ photoY: value })} />
                <Range label="Photo size" value={editor.photoSize} min={80} max={360} onChange={(value) => setEditor({ photoSize: value })} />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-zinc-100 pt-4">
              <Button variant="secondary" disabled={busy} onClick={() => void generateImage()}>
                {busy ? "Working…" : "Generate preview"}
              </Button>
              <Button variant="primary" disabled={busy} onClick={() => void openSharePanel()}>
                Share card
              </Button>
              <Button variant="ghost" onClick={resetEditor}>
                Reset
              </Button>
            </div>
          </Card>

          <Card className="min-h-[320px] lg:sticky lg:top-8">
            <h2 className="font-display text-lg font-semibold text-zinc-900">Merged output</h2>
            <p className="mt-1 text-sm text-zinc-600">Final PNG matches what you share or save.</p>
            <div className="mt-4 overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-200/80">
              {outputDataUrl ? (
                <img src={outputDataUrl} alt="Merged greeting output" className="aspect-square w-full object-cover" />
              ) : (
                <div className="flex aspect-square flex-col items-center justify-center gap-2 px-6 text-center">
                  <div className="rounded-full bg-white p-3 shadow-sm ring-1 ring-zinc-200/80">
                    <svg className="h-8 w-8 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-zinc-500">
                    Run <strong className="text-zinc-700">Generate preview</strong> to compose your card.
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        <ShareSheetModal
          open={shareOpen}
          onClose={() => {
            setShareOpen(false);
            setShareBlob(null);
          }}
          blob={shareBlob}
          filename={`${activeTemplate.id}.png`}
          userName={activeProfile.name}
        />
      </main>
    </AuthGate>
  );
}

function Range({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="space-y-2 text-sm">
      <span className="flex justify-between font-medium text-zinc-800">
        <span>{label}</span>
        <span className="tabular-nums text-zinc-500">{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-[var(--primary)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--primary)] [&::-webkit-slider-thumb]:shadow-md"
      />
    </label>
  );
}
