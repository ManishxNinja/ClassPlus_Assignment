"use client";

import { CATEGORIES } from "@/data/templates";
import { TemplateCategory } from "@/types/template";

interface CategoryTabsProps {
  selectedCategory: TemplateCategory | "All";
  onChange: (category: TemplateCategory | "All") => void;
}

export default function CategoryTabs({ selectedCategory, onChange }: CategoryTabsProps) {
  const options: Array<TemplateCategory | "All"> = ["All", ...CATEGORIES];

  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto pb-1">
      {options.map((category) => {
        const active = selectedCategory === category;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              active
                ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/25"
                : "bg-white/80 text-zinc-700 ring-1 ring-zinc-200/90 hover:bg-white hover:ring-violet-200"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
