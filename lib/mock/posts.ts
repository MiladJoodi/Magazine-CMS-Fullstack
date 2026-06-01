import {
  getCategoryByName,
  getCategoryBySlug,
  getCategoryNames,
} from "@/lib/mock/categories";
import {
  addToStorageList,
  readStorageList,
} from "@/lib/mock/storage-list";
import type { Post, PostDetail } from "@/lib/types/post";

export const DEMO_DELETED_POSTS_STORAGE_KEY = "northline-demo-deleted-posts";

export const CATEGORIES = getCategoryNames();

function getDeletedPostSlugs(): Set<string> {
  return new Set(readStorageList(DEMO_DELETED_POSTS_STORAGE_KEY));
}

function getActivePosts(): Post[] {
  const deleted = getDeletedPostSlugs();
  if (deleted.size === 0) {
    return MOCK_POSTS;
  }
  return MOCK_POSTS.filter((post) => !deleted.has(post.slug));
}

export function deleteDemoPost(
  slug: string
): { ok: true } | { ok: false; error: string } {
  if (!MOCK_POSTS.some((post) => post.slug === slug)) {
    return { ok: false, error: "Post not found." };
  }
  addToStorageList(DEMO_DELETED_POSTS_STORAGE_KEY, slug);
  return { ok: true };
}

function buildArticleBody(post: Post): string[] {
  const topic = post.category.toLowerCase();
  return [
    post.excerpt,
    `Over the past year, readers have asked whether the changes in ${topic} are a passing trend or a lasting shift. Reporters who cover ${post.category} say the answer depends on which neighborhoods, newsrooms, or communities you measure—and how willing institutions are to experiment.`,
    `${post.author}, who has followed this beat for several seasons, notes that the most convincing stories combine data with on-the-ground reporting. "You need both," they said in a recent interview. "Numbers without context feel hollow, and anecdotes without evidence do not hold up under scrutiny."`,
    `Critics argue that some of the hype around ${topic} papers over real trade-offs: cost, access, and who benefits when policies change. Supporters counter that incremental pilots—bike lanes, hybrid news workflows, slower itineraries—are already reshaping daily habits in ways that surveys alone cannot capture.`,
    `What comes next is less clear. Planners, editors, and entrepreneurs interviewed for this piece agreed on one point: the conversation has moved from whether change is coming to how quickly communities can adapt without leaving people behind. We will continue to track those developments in upcoming coverage.`,
  ];
}

function estimateReadMinutes(body: string[]): number {
  const words = body.join(" ").split(/\s+/).length;
  return Math.max(3, Math.round(words / 200));
}

function toPostDetail(post: Post): PostDetail {
  const body = buildArticleBody(post);
  return {
    ...post,
    body,
    readMinutes: estimateReadMinutes(body),
  };
}

/** Static post seed data */
export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    slug: "urban-design-future",
    title: "How Cities Are Reimagining Public Space for the Next Decade",
    excerpt:
      "From car-free boulevards to micro-parks, planners are betting on walkability and community-led design to reshape downtown cores.",
    category: "Urbanism",
    author: "Elena Marsh",
    publishedAt: "2026-05-28T09:00:00.000Z",
    viewCount: 18420,
    commentCount: 142,
    featured: true,
  },
  {
    id: "2",
    slug: "ai-in-newsrooms",
    title: "Inside the Newsroom Experiment with AI-Assisted Reporting",
    excerpt:
      "Editors share what worked, what failed, and where human judgment still matters when machines draft the first pass.",
    category: "Media",
    author: "James Okonkwo",
    publishedAt: "2026-05-27T14:30:00.000Z",
    viewCount: 12350,
    commentCount: 89,
  },
  {
    id: "3",
    slug: "slow-travel-comeback",
    title: "Why Slow Travel Is Having a Moment Again",
    excerpt:
      "Travelers are skipping layovers and packed itineraries in favor of rail routes, regional food, and longer stays in fewer places.",
    category: "Travel",
    author: "Sofia Reyes",
    publishedAt: "2026-05-26T11:15:00.000Z",
    viewCount: 9870,
    commentCount: 56,
  },
  {
    id: "4",
    slug: "indie-game-studio-profile",
    title: "A Studio of Twelve People Built the Year's Most Talked-About Indie Game",
    excerpt:
      "The team behind the breakout hit explains how constraint, Discord, and a shared mood board carried them to launch day.",
    category: "Culture",
    author: "Marcus Chen",
    publishedAt: "2026-05-25T16:45:00.000Z",
    viewCount: 22100,
    commentCount: 203,
  },
  {
    id: "5",
    slug: "climate-data-visualization",
    title: "Making Climate Data Readable Without Dumbing It Down",
    excerpt:
      "Data journalists walk through charts that helped readers grasp record heat without losing nuance or scientific accuracy.",
    category: "Science",
    author: "Priya Nair",
    publishedAt: "2026-05-24T08:20:00.000Z",
    viewCount: 7650,
    commentCount: 41,
  },
  {
    id: "6",
    slug: "weekend-cooking-labs",
    title: "The Weekend Cooking Labs Turning Home Kitchens into Test Kitchens",
    excerpt:
      "Amateur chefs are documenting fermentation trials and sauce experiments—and building loyal audiences along the way.",
    category: "Food",
    author: "Tom Bradley",
    publishedAt: "2026-05-23T13:00:00.000Z",
    viewCount: 5420,
    commentCount: 28,
  },
  {
    id: "7",
    slug: "remote-work-third-act",
    title: "Remote Work's Third Act: Fewer Rules, Sharper Expectations",
    excerpt:
      "Companies are dropping rigid return mandates while tightening output metrics and async communication norms.",
    category: "Business",
    author: "Nina Kowalski",
    publishedAt: "2026-05-22T10:40:00.000Z",
    viewCount: 15800,
    commentCount: 117,
  },
  {
    id: "8",
    slug: "photography-film-renaissance",
    title: "Film Photography Isn't Nostalgia—It's a Creative Reset",
    excerpt:
      "Young photographers explain why grain, delay, and limited frames are pushing them away from instant digital perfection.",
    category: "Arts",
    author: "Liam Foster",
    publishedAt: "2026-05-21T17:55:00.000Z",
    viewCount: 11300,
    commentCount: 64,
  },
  {
    id: "9",
    slug: "local-election-turnout",
    title: "What Drove Record Turnout in This Year's Local Elections",
    excerpt:
      "Door knocking, texting banks, and hyper-local issues combined to bring first-time voters to down-ballot races.",
    category: "Politics",
    author: "Aisha Williams",
    publishedAt: "2026-05-20T07:30:00.000Z",
    viewCount: 8900,
    commentCount: 72,
  },
  {
    id: "10",
    slug: "minimalist-wardrobe-guide",
    title: "The Minimalist Wardrobe Guide That Actually Stuck",
    excerpt:
      "Readers followed one writer's year-long closet audit—and reported spending less without feeling like they gave something up.",
    category: "Style",
    author: "Claire Dubois",
    publishedAt: "2026-05-19T12:10:00.000Z",
    viewCount: 6340,
    commentCount: 35,
  },
];

export function countPostsByCategory(categoryName: string): number {
  const lower = categoryName.toLowerCase();
  return getActivePosts().filter(
    (post) => post.category.toLowerCase() === lower
  ).length;
}

export function getPostsByCategory(categorySlugOrName: string): Post[] {
  const category =
    getCategoryBySlug(categorySlugOrName) ?? getCategoryByName(categorySlugOrName);

  const categoryName = category?.name ?? categorySlugOrName;

  return [...getActivePosts()]
    .filter((post) => post.category.toLowerCase() === categoryName.toLowerCase())
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getFeaturedPost(): Post {
  const posts = getActivePosts();
  const featured = posts.find((post) => post.featured);
  if (featured) {
    return featured;
  }
  const fallback = posts[0];
  if (!fallback) {
    throw new Error("No posts available");
  }
  return fallback;
}

export function getLatestPosts(limit = 6): Post[] {
  return [...getActivePosts()]
    .filter((post) => !post.featured)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}

export function getTrendingPosts(limit = 5): Post[] {
  return [...getActivePosts()]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit);
}

export function getAllPosts(): Post[] {
  return [...getActivePosts()];
}

export function getPostBySlug(slug: string): PostDetail | undefined {
  const post = getActivePosts().find((item) => item.slug === slug);
  if (!post) {
    return undefined;
  }
  return toPostDetail(post);
}

export function getAllPostSlugs(): string[] {
  return getActivePosts().map((post) => post.slug);
}

export function getRelatedPosts(slug: string, limit = 4): Post[] {
  const posts = getActivePosts();
  const current = posts.find((post) => post.slug === slug);
  if (!current) {
    return [];
  }

  const sameCategory = posts.filter(
    (post) => post.slug !== slug && post.category === current.category
  );
  const others = posts.filter(
    (post) => post.slug !== slug && post.category !== current.category
  );

  return [...sameCategory, ...others].slice(0, limit);
}
