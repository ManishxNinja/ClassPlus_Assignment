"use client";

import { GreetingTemplate } from "@/types/template";

interface TemplateCardPreviewProps {
  template: GreetingTemplate;
  userName: string;
  profileImage: string;
  onClick: () => void;
  onRemove?: () => void;
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 1a5 5 0 00-5 5v2H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 7V6a3 3 0 016 0v2H9z" />
    </svg>
  );
}

export default function TemplateCardPreview({
  template,
  userName,
  profileImage,
  onClick,
  onRemove,
}: TemplateCardPreviewProps) {
  return (
    <div className="relative">
      {onRemove ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          className="absolute right-3 top-14 z-20 cursor-pointer rounded-full bg-black/55 px-2 py-1 text-[11px] font-semibold text-white shadow backdrop-blur-sm hover:bg-black/75"
          aria-label={`Remove ${template.title}`}
        >
          Remove
        </button>
      ) : null}
      <button
        type="button"
        onClick={onClick}
        className="group relative w-full cursor-pointer overflow-hidden rounded-3xl bg-white text-left shadow-[0_18px_40px_-18px_rgba(15,23,42,0.25)] ring-1 ring-white/80 transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-20px_rgba(91,33,182,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
      >
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        <img
          src={template.imageUrl}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <img
          src={profileImage}
          alt=""
          className="absolute left-3 top-3 h-12 w-12 rounded-2xl object-cover shadow-lg ring-2 ring-white/90"
        />
        {template.category === "Custom" ? (
          <span className="absolute right-3 top-3 rounded-full bg-teal-400/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-teal-950 shadow-md ring-1 ring-teal-200/80">
            Yours
          </span>
        ) : template.premium ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-400/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-950 shadow-md ring-1 ring-amber-200/80">
            <LockIcon className="h-3.5 w-3.5" />
            Premium
          </span>
        ) : (
          <span className="absolute right-3 top-3 rounded-full bg-emerald-400/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-950 shadow-md ring-1 ring-emerald-200/80">
            Free
          </span>
        )}
        <p className="absolute bottom-3 left-3 right-3 truncate rounded-full bg-black/55 px-3 py-1.5 text-center text-sm font-semibold text-white shadow backdrop-blur-sm">
          {userName}
        </p>
      </div>
      <div className="border-t border-zinc-100/80 bg-white/95 px-4 py-3 backdrop-blur-sm">
        <p className="text-[15px] font-semibold text-zinc-900">{template.title}</p>
        <p className="text-xs font-medium text-violet-600/90">{template.category}</p>
      </div>
    </button>
    </div>
  );
}
