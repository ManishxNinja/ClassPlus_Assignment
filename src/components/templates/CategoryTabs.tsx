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
    <div className="flex flex-wrap gap-2">
      {options.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            selectedCategory === category
              ? "bg-indigo-600 text-white"
              : "bg-white text-zinc-700 ring-1 ring-zinc-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

