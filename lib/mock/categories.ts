import {
  addToStorageList,
  readStorageList,
} from "@/lib/mock/storage-list";
import type { Category } from "@/lib/types/category";

export const DEMO_CATEGORIES_STORAGE_KEY = "northline-demo-categories";
export const DEMO_DELETED_CATEGORIES_STORAGE_KEY =
  "northline-demo-deleted-categories";

function getDeletedCategorySlugs(): Set<string> {
  return new Set(readStorageList(DEMO_DELETED_CATEGORIES_STORAGE_KEY));
}

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

export function getStoredCategories(): Category[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(DEMO_CATEGORIES_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw) as Category[];
  } catch {
    return [];
  }
}

export function saveStoredCategories(categories: Category[]) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(DEMO_CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
}

export function getBaseCategories(): Category[] {
  return [...MOCK_CATEGORIES];
}

/** Server-safe: seed categories only (SSG, public pages) */
export function getAllCategories(): Category[] {
  return getBaseCategories();
}

/** Client: seed + localStorage extras from CMS */
export function getAllCategoriesMerged(): Category[] {
  const stored = getStoredCategories();
  const slugs = new Set(MOCK_CATEGORIES.map((c) => c.slug));
  const names = new Set(MOCK_CATEGORIES.map((c) => c.name.toLowerCase()));
  const merged = [...MOCK_CATEGORIES];
  for (const category of stored) {
    if (
      slugs.has(category.slug) ||
      names.has(category.name.toLowerCase())
    ) {
      continue;
    }
    merged.push(category);
    slugs.add(category.slug);
    names.add(category.name.toLowerCase());
  }
  const deleted = getDeletedCategorySlugs();
  return merged
    .filter((category) => !deleted.has(category.slug))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getAllCategories().find((category) => category.slug === slug);
}

export function getCategoryByName(name: string): Category | undefined {
  const lower = name.toLowerCase();
  return getAllCategories().find(
    (category) => category.name.toLowerCase() === lower
  );
}

export function getCategoryNames(): string[] {
  return getAllCategories().map((category) => category.name);
}

export function getCategoryNamesMerged(): string[] {
  return getAllCategoriesMerged().map((category) => category.name);
}

export function addDemoCategory(input: {
  name: string;
  description: string;
}): { ok: true; category: Category } | { ok: false; error: string } {
  const name = input.name.trim();
  const description = input.description.trim();
  if (!name) {
    return { ok: false, error: "Name is required." };
  }
  if (!description) {
    return { ok: false, error: "Description is required." };
  }

  const all = getAllCategoriesMerged();
  if (all.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
    return { ok: false, error: "A category with this name already exists." };
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  if (all.some((c) => c.slug === slug)) {
    return { ok: false, error: "A category with this slug already exists." };
  }

  const category: Category = { slug, name, description };
  const stored = getStoredCategories();
  stored.push(category);
  saveStoredCategories(stored);

  return { ok: true, category };
}

