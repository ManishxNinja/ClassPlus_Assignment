export type TemplateCategory =
  | "Birthday"
  | "Anniversary"
  | "Festivals"
  | "New Year"
  | "Thanks"
  | "Congrats";

export interface GreetingTemplate {
  id: string;
  title: string;
  category: TemplateCategory;
  imageUrl: string;
  premium: boolean;
}

