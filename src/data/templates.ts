import { GreetingTemplate, TemplateCategory } from "@/types/template";

export const CATEGORIES: TemplateCategory[] = [
  "Birthday",
  "Anniversary",
  "Festivals",
  "New Year",
  "Thanks",
  "Congrats",
];

export const TEMPLATES: GreetingTemplate[] = [
  {
    id: "birthday-blast",
    title: "Birthday Blast",
    category: "Birthday",
    imageUrl: "/templates/birthday.svg",
    premium: false,
  },
  {
    id: "anniversary-gold",
    title: "Anniversary Gold",
    category: "Anniversary",
    imageUrl: "/templates/anniversary.svg",
    premium: true,
  },
  {
    id: "festival-lights",
    title: "Festival Lights",
    category: "Festivals",
    imageUrl: "/templates/festival.svg",
    premium: false,
  },
  {
    id: "new-year-party",
    title: "New Year Party",
    category: "New Year",
    imageUrl: "/templates/new-year.svg",
    premium: true,
  },
  {
    id: "thanks-note",
    title: "Thanks Note",
    category: "Thanks",
    imageUrl: "/templates/thanks.svg",
    premium: false,
  },
  {
    id: "congrats-moment",
    title: "Congrats Moment",
    category: "Congrats",
    imageUrl: "/templates/congrats.svg",
    premium: true,
  },
];

export function getTemplateById(templateId: string) {
  return TEMPLATES.find((template) => template.id === templateId);
}

