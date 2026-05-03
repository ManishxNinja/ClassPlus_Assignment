"use client";

interface UpsellModalProps {
  open: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export default function UpsellModal({ open, onClose, onUpgrade }: UpsellModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-zinc-900">Premium template</h2>
        <p className="mt-2 text-sm text-zinc-600">
          This template is available in the premium plan. Upgrade to unlock all premium cards.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700"
          >
            Maybe later
          </button>
          <button
            type="button"
            onClick={onUpgrade}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Upgrade now
          </button>
        </div>
      </div>
    </div>
  );
}

