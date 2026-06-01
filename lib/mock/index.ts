/**
 * Central mock data layer (portfolio demo).
 * Replace imports from here with Prisma/API when going full-stack.
 */

export {
  MOCK_CATEGORIES,
  getAllCategories,
  getCategoryByName,
  getCategoryBySlug,
  getCategoryNames,
} from "@/lib/mock/categories";

export {
  MOCK_POSTS,
  CATEGORIES,
  getAllPosts,
  getAllPostSlugs,
  getFeaturedPost,
  getLatestPosts,
  getPostBySlug,
  getPostsByCategory,
  getRelatedPosts,
  getTrendingPosts,
} from "@/lib/mock/posts";

export { getCommentsForPost } from "@/lib/mock/comments";

export {
  MOCK_AUTHORS,
  DEMO_AUTHORS_STORAGE_KEY,
  addDemoAuthor,
  countPostsByAuthor,
  getAllAuthorsMerged,
  getAuthorByName,
  getAuthorsForServer,
  getBaseAuthors,
  getStoredAuthors,
  saveStoredAuthors,
} from "@/lib/mock/authors";
