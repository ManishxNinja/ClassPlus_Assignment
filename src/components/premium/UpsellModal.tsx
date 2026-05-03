"use client";

import Button from "@/components/ui/Button";

interface UpsellModalProps {
  open: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export default function UpsellModal({ open, onClose, onUpgrade }: UpsellModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/55 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upsell-title"
        className="w-full max-w-md overflow-hidden rounded-3xl border border-white/50 bg-white shadow-[0_32px_64px_-24px_rgba(91,33,182,0.45)]"
      >
        <div className="bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-700 px-6 py-8 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">Premium</p>
          <h2 id="upsell-title" className="font-display mt-2 text-2xl font-semibold leading-snug">
            Unlock this template
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/90">
            Upgrade once for this demo to access every premium layout—your profile overlays carry through
            automatically.
          </p>
        </div>
        <div className="space-y-4 bg-white px-6 py-5">
          <ul className="space-y-2 text-sm text-zinc-600">
            <li className="flex gap-2">
              <span className="text-violet-500">✓</span>
              Full library of premium backgrounds
            </li>
            <li className="flex gap-2">
              <span className="text-violet-500">✓</span>
              Same export quality as free templates
            </li>
          </ul>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={onClose} className="sm:min-w-[7rem]">
              Not now
            </Button>
            <Button variant="primary" onClick={onUpgrade} className="sm:min-w-[9rem]">
              Upgrade & continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
