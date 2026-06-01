import {
  DEMO_DELETED_CATEGORIES_STORAGE_KEY,
  getAllCategoriesMerged,
  getStoredCategories,
  saveStoredCategories,
} from "@/lib/mock/categories";
import { countPostsByCategory } from "@/lib/mock/posts";
import { addToStorageList } from "@/lib/mock/storage-list";

export function deleteDemoCategory(
  slug: string
): { ok: true } | { ok: false; error: string } {
  const category = getAllCategoriesMerged().find((c) => c.slug === slug);
  if (!category) {
    return { ok: false, error: "Category not found." };
  }

  const postCount = countPostsByCategory(category.name);
  if (postCount > 0) {
    return {
      ok: false,
      error: `Cannot delete: ${postCount} post(s) use this category.`,
    };
  }

  const stored = getStoredCategories();
  const storedIndex = stored.findIndex((c) => c.slug === slug);
  if (storedIndex >= 0) {
    stored.splice(storedIndex, 1);
    saveStoredCategories(stored);
    return { ok: true };
  }

  addToStorageList(DEMO_DELETED_CATEGORIES_STORAGE_KEY, slug);
  return { ok: true };
}

export function canDeleteCategory(slug: string): boolean {
  const category = getAllCategoriesMerged().find((c) => c.slug === slug);
  if (!category) {
    return false;
  }
  return countPostsByCategory(category.name) === 0;
}
