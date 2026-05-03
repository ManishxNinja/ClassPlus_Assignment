"use client";

import { GreetingTemplate, TemplateCategory } from "@/types/template";
import TemplateCardPreview from "./TemplateCardPreview";

interface TemplateGridProps {
  templates: GreetingTemplate[];
  selectedCategory: TemplateCategory | "All";
  userName: string;
  profileImage: string;
  onSelectTemplate: (template: GreetingTemplate) => void;
}

export default function TemplateGrid({
  templates,
  selectedCategory,
  userName,
  profileImage,
  onSelectTemplate,
}: TemplateGridProps) {
  const filteredTemplates =
    selectedCategory === "All"
      ? templates
      : templates.filter((template) => template.category === selectedCategory);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredTemplates.map((template) => (
        <TemplateCardPreview
          key={template.id}
          template={template}
          userName={userName}
          profileImage={profileImage}
          onClick={() => onSelectTemplate(template)}
        />
      ))}
    </div>
  );
}

