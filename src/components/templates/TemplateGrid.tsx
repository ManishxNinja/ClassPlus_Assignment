"use client";

import { GreetingTemplate, TemplateCategory } from "@/types/template";
import TemplateCardPreview from "./TemplateCardPreview";

interface TemplateGridProps {
  templates: GreetingTemplate[];
  selectedCategory: TemplateCategory | "All";
  userName: string;
  profileImage: string;
  onSelectTemplate: (template: GreetingTemplate) => void;
  onRemoveCustom?: (id: string) => void;
}

export default function TemplateGrid({
  templates,
  selectedCategory,
  userName,
  profileImage,
  onSelectTemplate,
  onRemoveCustom,
}: TemplateGridProps) {
  const filteredTemplates =
    selectedCategory === "All"
      ? templates
      : templates.filter((template) => template.category === selectedCategory);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredTemplates.length === 0 ? (
        <p className="col-span-full rounded-2xl border border-dashed border-zinc-300 bg-white/60 py-12 text-center text-sm text-zinc-500">
          No templates here yet{selectedCategory === "Custom" ? " — upload your own image above." : "."}
        </p>
      ) : null}
      {filteredTemplates.map((template) => (
        <TemplateCardPreview
          key={template.id}
          template={template}
          userName={userName}
          profileImage={profileImage}
          onClick={() => onSelectTemplate(template)}
          onRemove={
            template.category === "Custom" && onRemoveCustom
              ? () => onRemoveCustom(template.id)
              : undefined
          }
        />
      ))}
    </div>
  );
}

