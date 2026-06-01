import { getAllPosts } from "@/lib/mock/posts";
import type { Author } from "@/lib/types/author";

export const DEMO_AUTHORS_STORAGE_KEY = "northline-demo-authors";

/** Static author seed data */
export const MOCK_AUTHORS: Author[] = [
  { id: "milad-joodi", name: "Milad Joodi", slug: "milad-joodi", bio: "Editor & developer." },
  { id: "elena-marsh", name: "Elena Marsh", slug: "elena-marsh" },
  { id: "james-okonkwo", name: "James Okonkwo", slug: "james-okonkwo" },
  { id: "sofia-reyes", name: "Sofia Reyes", slug: "sofia-reyes" },
  { id: "marcus-chen", name: "Marcus Chen", slug: "marcus-chen" },
  { id: "priya-nair", name: "Priya Nair", slug: "priya-nair" },
  { id: "tom-bradley", name: "Tom Bradley", slug: "tom-bradley" },
  { id: "nina-kowalski", name: "Nina Kowalski", slug: "nina-kowalski" },
  { id: "liam-foster", name: "Liam Foster", slug: "liam-foster" },
  { id: "aisha-williams", name: "Aisha Williams", slug: "aisha-williams" },
  { id: "claire-dubois", name: "Claire Dubois", slug: "claire-dubois" },
];

export function getStoredAuthors(): Author[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(DEMO_AUTHORS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw) as Author[];
  } catch {
    return [];
  }
}

export function saveStoredAuthors(authors: Author[]) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(DEMO_AUTHORS_STORAGE_KEY, JSON.stringify(authors));
}

export function getBaseAuthors(): Author[] {
  return [...MOCK_AUTHORS];
}

/** Server-safe: seed authors only */
export function getAuthorsForServer(): Author[] {
  return getBaseAuthors();
}

/** Client: seed + localStorage extras from CMS */
export function getAllAuthorsMerged(): Author[] {
  const stored = getStoredAuthors();
  const names = new Set(MOCK_AUTHORS.map((a) => a.name.toLowerCase()));
  const merged = [...MOCK_AUTHORS];
  for (const author of stored) {
    if (!names.has(author.name.toLowerCase())) {
      merged.push(author);
      names.add(author.name.toLowerCase());
    }
  }
  return merged.sort((a, b) => a.name.localeCompare(b.name));
}

export function addDemoAuthor(input: {
  name: string;
  bio?: string;
}): { ok: true; author: Author } | { ok: false; error: string } {
  const name = input.name.trim();
  if (!name) {
    return { ok: false, error: "Name is required." };
  }

  const all = getAllAuthorsMerged();
  if (all.some((a) => a.name.toLowerCase() === name.toLowerCase())) {
    return { ok: false, error: "An author with this name already exists." };
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const author: Author = {
    id: `custom-${slug}-${Date.now()}`,
    name,
    slug,
    bio: input.bio?.trim() || undefined,
  };

  const stored = getStoredAuthors();
  stored.push(author);
  saveStoredAuthors(stored);

  return { ok: true, author };
}

export function countPostsByAuthor(authorName: string): number {
  return getAllPosts().filter((post) => post.author === authorName).length;
}

export function getAuthorByName(name: string): Author | undefined {
  return getAuthorsForServer().find(
    (author) => author.name.toLowerCase() === name.toLowerCase()
  );
}
