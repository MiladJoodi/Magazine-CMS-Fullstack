import type { Category } from "@/lib/types/category";

/** Static category seed data */
export const MOCK_CATEGORIES: Category[] = [
  {
    slug: "urbanism",
    name: "Urbanism",
    description: "Cities, public space, and how we live together downtown.",
  },
  {
    slug: "media",
    name: "Media",
    description: "Newsrooms, platforms, and the future of reporting.",
  },
  {
    slug: "travel",
    name: "Travel",
    description: "Slow trips, regional food, and itineraries worth taking.",
  },
  {
    slug: "culture",
    name: "Culture",
    description: "Games, film, music, and the ideas behind pop moments.",
  },
  {
    slug: "science",
    name: "Science",
    description: "Data, climate, and making complex topics readable.",
  },
  {
    slug: "food",
    name: "Food",
    description: "Home kitchens, experiments, and what people are cooking.",
  },
  {
    slug: "business",
    name: "Business",
    description: "Work, policy, and how organizations actually operate.",
  },
  {
    slug: "arts",
    name: "Arts",
    description: "Photography, design, and creative practice in the wild.",
  },
  {
    slug: "politics",
    name: "Politics",
    description: "Elections, civic life, and power at the local level.",
  },
  {
    slug: "style",
    name: "Style",
    description: "Fashion, taste, and the rituals of everyday dress.",
  },
];

export function getAllCategories(): Category[] {
  return [...MOCK_CATEGORIES];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return MOCK_CATEGORIES.find((category) => category.slug === slug);
}

export function getCategoryByName(name: string): Category | undefined {
  return MOCK_CATEGORIES.find(
    (category) => category.name.toLowerCase() === name.toLowerCase()
  );
}

export function getCategoryNames(): string[] {
  return MOCK_CATEGORIES.map((category) => category.name);
}
