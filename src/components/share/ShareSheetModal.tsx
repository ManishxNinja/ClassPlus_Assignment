"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import {
  copyImageToClipboard,
  downloadBlob,
  openInstagramWeb,
  openMailto,
  openWhatsAppWithCaption,
  shareWithNativeSheet,
} from "@/lib/share-actions";

interface ShareSheetModalProps {
  open: boolean;
  onClose: () => void;
  blob: Blob | null;
  filename: string;
  userName: string;
}

type Toast = { message: string; tone: "ok" | "err" } | null;

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.883 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function IconDownload({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function IconCopy({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconDevice({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export default function ShareSheetModal({ open, onClose, blob, filename, userName }: ShareSheetModalProps) {
  const [toast, setToast] = useState<Toast>(null);
  const [nativeAvailable, setNativeAvailable] = useState(false);

  useEffect(() => {
    if (!open || !blob) return;
    const file = new File([blob], filename, { type: "image/png" });
    const can =
      typeof navigator !== "undefined" && typeof navigator.canShare === "function"
        ? navigator.canShare({ files: [file] })
        : false;
    setNativeAvailable(Boolean(can));
  }, [open, blob, filename]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  if (!open) return null;

  const caption = `Greetings from ${userName} — made with Custom Greetings App`;

  async function handleCopy() {
    if (!blob) return;
    const ok = await copyImageToClipboard(blob);
    setToast(
      ok
        ? { message: "Photo copied — paste wherever you like.", tone: "ok" }
        : { message: "Could not copy (try Download instead).", tone: "err" },
    );
  }

  function handleDownload() {
    if (!blob) return;
    downloadBlob(blob, filename);
    setToast({ message: "Download started.", tone: "ok" });
  }

  async function handleWhatsApp() {
    if (!blob) return;
    // Open first (same synchronous click turn) so the browser does not block the new tab/window.
    openWhatsAppWithCaption(caption);
    const ok = await copyImageToClipboard(blob);
    if (ok) {
      setToast({
        message: "WhatsApp opened — paste your card (⌘V / Ctrl+V / long-press → Paste).",
        tone: "ok",
      });
      return;
    }
    downloadBlob(blob, filename);
    setToast({
      message: "Couldn’t copy — PNG saved to Downloads. Attach it in WhatsApp.",
      tone: "ok",
    });
  }

  function handleEmail() {
    openMailto(`Greeting from ${userName}`, `${caption}\n\n(Attach the downloaded PNG — use Download first.)`);
  }

  async function handleInstagram() {
    if (!blob) return;
    openInstagramWeb();
    const ok = await copyImageToClipboard(blob);
    if (ok) {
      setToast({
        message: "Instagram opened — paste into Story or Post (or New post → Gallery).",
        tone: "ok",
      });
    } else {
      downloadBlob(blob, filename);
      setToast({
        message: "Couldn’t copy — PNG saved. Open Photos/Gallery in Instagram to upload.",
        tone: "ok",
      });
    }
  }

  async function handleNativeShare() {
    if (!blob) return;
    const file = new File([blob], filename, { type: "image/png" });
    const ok = await shareWithNativeSheet(file, "Custom Greeting", caption);
    if (ok) onClose();
  }

  const optionBase =
    "flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-zinc-200/90 bg-white p-4 text-center shadow-sm transition hover:border-violet-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 cursor-pointer bg-zinc-950/60 backdrop-blur-sm"
        aria-label="Close share panel"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-title"
        className="relative z-10 w-full max-w-lg rounded-t-3xl border border-white/60 bg-white p-6 shadow-2xl sm:rounded-3xl"
      >
        <div className="mb-6 flex items-start justify-between gap-3">
          <div>
            <h2 id="share-title" className="font-display text-xl font-semibold text-zinc-900">
              Share your card
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Pick a destination — we save a crisp PNG you can post anywhere.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!blob ? (
          <p className="text-sm text-zinc-500">Preparing image…</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <button type="button" className={optionBase} onClick={() => void handleWhatsApp()}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-inner">
                  <IconWhatsApp className="h-7 w-7" />
                </span>
                <span className="text-sm font-semibold text-zinc-900">WhatsApp</span>
                <span className="text-[11px] leading-tight text-zinc-500">Opens WhatsApp · copy & paste</span>
              </button>

              <button type="button" className={optionBase} onClick={() => void handleInstagram()}>
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-inner"
                  style={{
                    background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                  }}
                >
                  <IconInstagram className="h-7 w-7" />
                </span>
                <span className="text-sm font-semibold text-zinc-900">Instagram</span>
                <span className="text-[11px] leading-tight text-zinc-500">Opens Instagram · paste image</span>
              </button>

              <button type="button" className={optionBase} onClick={handleEmail}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-white shadow-inner">
                  <IconMail className="h-6 w-6" />
                </span>
                <span className="text-sm font-semibold text-zinc-900">Email</span>
                <span className="text-[11px] leading-tight text-zinc-500">Opens mail draft</span>
              </button>

              <button type="button" className={optionBase} onClick={() => void handleCopy()}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 shadow-inner">
                  <IconCopy className="h-6 w-6" />
                </span>
                <span className="text-sm font-semibold text-zinc-900">Copy image</span>
                <span className="text-[11px] leading-tight text-zinc-500">Paste anywhere</span>
              </button>

              <button type="button" className={optionBase} onClick={handleDownload}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 shadow-inner">
                  <IconDownload className="h-6 w-6" />
                </span>
                <span className="text-sm font-semibold text-zinc-900">Download</span>
                <span className="text-[11px] leading-tight text-zinc-500">Save PNG file</span>
              </button>

              {nativeAvailable ? (
                <button type="button" className={optionBase} onClick={() => void handleNativeShare()}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-100 text-fuchsia-700 shadow-inner">
                    <IconDevice className="h-6 w-6" />
                  </span>
                  <span className="text-sm font-semibold text-zinc-900">More apps</span>
                  <span className="text-[11px] leading-tight text-zinc-500">System share</span>
                </button>
              ) : null}
            </div>

            <p className="mt-4 rounded-xl bg-zinc-50 px-3 py-2 text-[11px] leading-relaxed text-zinc-500">
              WhatsApp and Instagram open right away; we copy the image next so you can paste. If copy isn&apos;t
              supported, use Download and attach the PNG.
            </p>
          </>
        )}

        {toast ? (
          <div
            className={`mt-4 rounded-xl px-3 py-2 text-sm ${
              toast.tone === "ok" ? "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200/80" : "bg-red-50 text-red-900 ring-1 ring-red-200/80"
            }`}
            role="status"
          >
            {toast.message}
          </div>
        ) : null}

        <div className="mt-5 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
