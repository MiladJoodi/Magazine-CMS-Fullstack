/**
 * Central mock data layer (portfolio demo).
 * Replace imports from here with Prisma/API when going full-stack.
 */

export {
  MOCK_CATEGORIES,
  DEMO_CATEGORIES_STORAGE_KEY,
  addDemoCategory,
  getAllCategories,
  getAllCategoriesMerged,
  getBaseCategories,
  getCategoryByName,
  getCategoryBySlug,
  getCategoryNames,
  getCategoryNamesMerged,
  getStoredCategories,
  saveStoredCategories,
} from "@/lib/mock/categories";

export { canDeleteCategory, deleteDemoCategory } from "@/lib/mock/category-actions";

export {
  MOCK_POSTS,
  CATEGORIES,
  DEMO_DELETED_POSTS_STORAGE_KEY,
  deleteDemoPost,
  getAllPosts,
  getAllPostSlugs,
  getFeaturedPost,
  getLatestPosts,
  getPostBySlug,
  getPostsByCategory,
  getRelatedPosts,
  getTrendingPosts,
  countPostsByCategory,
} from "@/lib/mock/posts";

export { getCommentsForPost } from "@/lib/mock/comments";

export {
  MOCK_AUTHORS,
  DEMO_AUTHORS_STORAGE_KEY,
  addDemoAuthor,
  canDeleteAuthor,
  countPostsByAuthor,
  deleteDemoAuthor,
  getAllAuthorsMerged,
  getAuthorByName,
  getAuthorsForServer,
  getBaseAuthors,
  getStoredAuthors,
  saveStoredAuthors,
} from "@/lib/mock/authors";
