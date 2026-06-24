import { getAllPosts } from "@/lib/mock/posts";
import {
  addToStorageList,
  readStorageList,
} from "@/lib/mock/storage-list";
import type { Author } from "@/lib/types/author";

export const DEMO_AUTHORS_STORAGE_KEY = "northline-demo-authors";
export const DEMO_DELETED_AUTHORS_STORAGE_KEY = "northline-demo-deleted-authors";

function getDeletedAuthorIds(): Set<string> {
  return new Set(readStorageList(DEMO_DELETED_AUTHORS_STORAGE_KEY));
}

/** Static author seed data */
export const MOCK_AUTHORS: Author[] = [
  { id: "milad-joodi", name: "Milad Joodi", slug: "milad-joodi", bio: "Editor & developer.", createdAt: new Date(), updatedAt: new Date() },
  { id: "elena-marsh", name: "Elena Marsh", slug: "elena-marsh", createdAt: new Date(), updatedAt: new Date() },
  { id: "james-okonkwo", name: "James Okonkwo", slug: "james-okonkwo", createdAt: new Date(), updatedAt: new Date() },
  { id: "sofia-reyes", name: "Sofia Reyes", slug: "sofia-reyes", createdAt: new Date(), updatedAt: new Date() },
  { id: "marcus-chen", name: "Marcus Chen", slug: "marcus-chen", createdAt: new Date(), updatedAt: new Date() },
  { id: "priya-nair", name: "Priya Nair", slug: "priya-nair", createdAt: new Date(), updatedAt: new Date() },
  { id: "tom-bradley", name: "Tom Bradley", slug: "tom-bradley", createdAt: new Date(), updatedAt: new Date() },
  { id: "nina-kowalski", name: "Nina Kowalski", slug: "nina-kowalski", createdAt: new Date(), updatedAt: new Date() },
  { id: "liam-foster", name: "Liam Foster", slug: "liam-foster", createdAt: new Date(), updatedAt: new Date() },
  { id: "aisha-williams", name: "Aisha Williams", slug: "aisha-williams", createdAt: new Date(), updatedAt: new Date() },
  { id: "claire-dubois", name: "Claire Dubois", slug: "claire-dubois", createdAt: new Date(), updatedAt: new Date() },
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
  const deleted = getDeletedAuthorIds();
  const stored = getStoredAuthors();
  const names = new Set(MOCK_AUTHORS.map((a) => a.name.toLowerCase()));
  const merged = [...MOCK_AUTHORS];
  for (const author of stored) {
    if (!names.has(author.name.toLowerCase())) {
      merged.push(author);
      names.add(author.name.toLowerCase());
    }
  }
  return merged
    .filter((author) => !deleted.has(author.id))
    .sort((a, b) => a.name.localeCompare(b.name));
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
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const stored = getStoredAuthors();
  stored.push(author);
  saveStoredAuthors(stored);

  return { ok: true, author };
}

export function deleteDemoAuthor(
  id: string
): { ok: true } | { ok: false; error: string } {
  const author = getAllAuthorsMerged().find((a) => a.id === id);
  if (!author) {
    return { ok: false, error: "Author not found." };
  }

  const postCount = countPostsByAuthor(author.name);
  if (postCount > 0) {
    return {
      ok: false,
      error: `Cannot delete: ${postCount} post(s) use this author.`,
    };
  }

  const stored = getStoredAuthors();
  const storedIndex = stored.findIndex((a) => a.id === id);
  if (storedIndex >= 0) {
    stored.splice(storedIndex, 1);
    saveStoredAuthors(stored);
    return { ok: true };
  }

  addToStorageList(DEMO_DELETED_AUTHORS_STORAGE_KEY, id);
  return { ok: true };
}

export function canDeleteAuthor(id: string): boolean {
  const author = getAllAuthorsMerged().find((a) => a.id === id);
  if (!author) {
    return false;
  }
  return countPostsByAuthor(author.name) === 0;
}

export function countPostsByAuthor(authorName: string): number {
  return getAllPosts().filter((post) => post.author === authorName).length;
}

export function getAuthorByName(name: string): Author | undefined {
  return getAuthorsForServer().find(
    (author) => author.name.toLowerCase() === name.toLowerCase()
  );
}
