import { GreetingTemplate, TemplateCategory } from "@/types/template";

export const CATEGORIES: TemplateCategory[] = [
  "Birthday",
  "Anniversary",
  "Festivals",
  "New Year",
  "Thanks",
  "Congrats",
  "Custom",
];

export const TEMPLATES: GreetingTemplate[] = [
  // Birthday
  {
    id: "birthday-blast",
    title: "Sunburst Party",
    category: "Birthday",
    imageUrl: "/templates/birthday.svg",
    premium: false,
  },
  {
    id: "birthday-confetti",
    title: "Confetti Night",
    category: "Birthday",
    imageUrl: "/templates/birthday-confetti.svg",
    premium: false,
  },
  {
    id: "birthday-candy",
    title: "Candy Stripe",
    category: "Birthday",
    imageUrl: "/templates/birthday-candy.svg",
    premium: false,
  },
  {
    id: "birthday-galaxy",
    title: "Galaxy Bash",
    category: "Birthday",
    imageUrl: "/templates/birthday-galaxy.svg",
    premium: true,
  },
  // Anniversary
  {
    id: "anniversary-gold",
    title: "Rose Garden",
    category: "Anniversary",
    imageUrl: "/templates/anniversary.svg",
    premium: true,
  },
  {
    id: "anniversary-moonlight",
    title: "Moonlit Shore",
    category: "Anniversary",
    imageUrl: "/templates/anniversary-moonlight.svg",
    premium: false,
  },
  {
    id: "anniversary-velvet",
    title: "Velvet Romance",
    category: "Anniversary",
    imageUrl: "/templates/anniversary-velvet.svg",
    premium: true,
  },
  // Festivals
  {
    id: "festival-lights",
    title: "Aqua Festival",
    category: "Festivals",
    imageUrl: "/templates/festival.svg",
    premium: false,
  },
  {
    id: "festival-holi",
    title: "Holi Splash",
    category: "Festivals",
    imageUrl: "/templates/festival-holi.svg",
    premium: false,
  },
  {
    id: "festival-diwali",
    title: "Diya Glow",
    category: "Festivals",
    imageUrl: "/templates/festival-diwali.svg",
    premium: true,
  },
  {
    id: "festival-lanterns",
    title: "Night Lanterns",
    category: "Festivals",
    imageUrl: "/templates/festival-lanterns.svg",
    premium: true,
  },
  // New Year
  {
    id: "new-year-party",
    title: "2026 Tide",
    category: "New Year",
    imageUrl: "/templates/new-year.svg",
    premium: true,
  },
  {
    id: "new-year-fireworks",
    title: "Midnight Spark",
    category: "New Year",
    imageUrl: "/templates/new-year-fireworks.svg",
    premium: false,
  },
  {
    id: "new-year-aurora",
    title: "Aurora Eve",
    category: "New Year",
    imageUrl: "/templates/new-year-aurora.svg",
    premium: true,
  },
  // Thanks
  {
    id: "thanks-note",
    title: "Fresh Thanks",
    category: "Thanks",
    imageUrl: "/templates/thanks.svg",
    premium: false,
  },
  {
    id: "thanks-botanical",
    title: "Botanical Note",
    category: "Thanks",
    imageUrl: "/templates/thanks-botanical.svg",
    premium: false,
  },
  {
    id: "thanks-gold",
    title: "Gold Foil Thanks",
    category: "Thanks",
    imageUrl: "/templates/thanks-gold.svg",
    premium: true,
  },
  // Congrats
  {
    id: "congrats-moment",
    title: "Purple Bloom",
    category: "Congrats",
    imageUrl: "/templates/congrats.svg",
    premium: true,
  },
  {
    id: "congrats-trophy",
    title: "Victory Stand",
    category: "Congrats",
    imageUrl: "/templates/congrats-trophy.svg",
    premium: false,
  },
  {
    id: "congrats-neon",
    title: "Neon Arena",
    category: "Congrats",
    imageUrl: "/templates/congrats-neon.svg",
    premium: true,
  },
];

export function getTemplateById(templateId: string) {
  return TEMPLATES.find((template) => template.id === templateId);
}
