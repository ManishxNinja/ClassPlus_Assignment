"use client";

import { GreetingTemplate } from "@/types/template";

interface TemplateCardPreviewProps {
  template: GreetingTemplate;
  userName: string;
  profileImage: string;
  onClick: () => void;
}

export default function TemplateCardPreview({
  template,
  userName,
  profileImage,
  onClick,
}: TemplateCardPreviewProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-black/5 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden">
        <img src={template.imageUrl} alt={template.title} className="h-full w-full object-cover" />
        <img
          src={profileImage}
          alt={`${userName} avatar`}
          className="absolute left-3 top-3 h-12 w-12 rounded-full object-cover ring-2 ring-white"
        />
        <p className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-sm font-medium text-white">
          {userName}
        </p>
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            template.premium ? "bg-amber-300 text-amber-950" : "bg-emerald-300 text-emerald-950"
          }`}
        >
          {template.premium ? "Premium" : "Free"}
        </span>
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-zinc-900">{template.title}</p>
        <p className="text-xs text-zinc-500">{template.category}</p>
      </div>
    </button>
  );
}

