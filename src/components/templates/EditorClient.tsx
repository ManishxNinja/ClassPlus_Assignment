"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGate from "@/components/shared/AuthGate";
import { getTemplateById } from "@/data/templates";
import { composeGreetingImage } from "@/lib/image-composer";
import { useAppStore } from "@/store/useAppStore";

export default function EditorClient({ templateId }: { templateId: string }) {
  const router = useRouter();
  const template = useMemo(() => getTemplateById(templateId), [templateId]);
  const profile = useAppStore((state) => state.profile);
  const editor = useAppStore((state) => state.editor);
  const setEditor = useAppStore((state) => state.setEditor);
  const resetEditor = useAppStore((state) => state.resetEditor);
  const [outputDataUrl, setOutputDataUrl] = useState<string>("");
  const [busy, setBusy] = useState(false);

  if (!template || !profile) {
    return (
      <AuthGate>
        <main className="p-8">
          <p className="text-sm text-zinc-600">Template or profile not found.</p>
          <button
            type="button"
            onClick={() => router.push("/home")}
            className="mt-3 rounded-xl bg-zinc-900 px-4 py-2 text-sm text-white"
          >
            Go back home
          </button>
        </main>
      </AuthGate>
    );
  }

  const activeTemplate = template;
  const activeProfile = profile;

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

  async function handleShare() {
    const blob = await generateImage();
    const file = new File([blob], `${activeTemplate.id}.png`, { type: "image/png" });

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: "Custom Greeting",
        text: `Greetings from ${activeProfile.name}`,
        files: [file],
      });
      return;
    }

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${activeTemplate.id}.png`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <AuthGate>
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900">{activeTemplate.title}</h1>
          <button
            type="button"
            onClick={() => router.push("/home")}
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
          >
            Back to templates
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <img src={activeTemplate.imageUrl} alt={activeTemplate.title} className="aspect-square w-full rounded-xl" />
            <div className="grid gap-3 sm:grid-cols-2">
              <Range label="Text X" value={editor.textX} min={100} max={980} onChange={(value) => setEditor({ textX: value })} />
              <Range label="Text Y" value={editor.textY} min={120} max={980} onChange={(value) => setEditor({ textY: value })} />
              <Range label="Text Size" value={editor.textSize} min={24} max={90} onChange={(value) => setEditor({ textSize: value })} />
              <Range label="Photo X" value={editor.photoX} min={120} max={960} onChange={(value) => setEditor({ photoX: value })} />
              <Range label="Photo Y" value={editor.photoY} min={120} max={900} onChange={(value) => setEditor({ photoY: value })} />
              <Range label="Photo Size" value={editor.photoSize} min={80} max={360} onChange={(value) => setEditor({ photoSize: value })} />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void generateImage()}
                disabled={busy}
                className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:bg-zinc-500"
              >
                {busy ? "Generating..." : "Generate Preview"}
              </button>
              <button
                type="button"
                onClick={() => void handleShare()}
                disabled={busy}
                className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:bg-indigo-400"
              >
                Share / Download
              </button>
              <button
                type="button"
                onClick={resetEditor}
                className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
              >
                Reset adjustments
              </button>
              {outputDataUrl ? (
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    "I created this greeting with Custom Greetings App!",
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800"
                >
                  Share via WhatsApp
                </a>
              ) : null}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-3 text-lg font-semibold text-zinc-900">Merged output</h2>
            {outputDataUrl ? (
              <img src={outputDataUrl} alt="Merged greeting output" className="aspect-square w-full rounded-xl" />
            ) : (
              <p className="text-sm text-zinc-500">
                Click <strong>Generate Preview</strong> to render merged output.
              </p>
            )}
          </section>
        </div>
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
    <label className="space-y-1 text-sm text-zinc-700">
      <span className="font-medium">
        {label}: {value}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-indigo-600"
      />
    </label>
  );
}

