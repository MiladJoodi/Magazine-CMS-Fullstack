import type { Comment } from "@/lib/types/post";

const COMMENT_TEMPLATES = [
  "This piece nails the tension between optimism and skepticism. Would love a follow-up on costs.",
  "Great reporting. The on-the-ground quotes made it feel much more concrete than most coverage.",
  "I disagree with one framing choice here, but the data section was fair and well sourced.",
  "Shared this with my team—we have been debating the same questions internally for months.",
  "The conclusion felt rushed, but the middle sections were among the best I have read on this topic.",
];

const COMMENT_AUTHORS = [
  "Jordan Lee",
  "Morgan Patel",
  "Alex Rivera",
  "Sam Okoro",
  "Taylor Kim",
];

export function getCommentsForPost(slug: string, limit = 5): Comment[] {
  const seed = slug.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return Array.from({ length: Math.min(limit, COMMENT_TEMPLATES.length) }, (_, i) => {
    const index = (seed + i) % COMMENT_TEMPLATES.length;
    const day = String(20 - i).padStart(2, "0");
    return {
      id: `${slug}-comment-${i + 1}`,
      author: COMMENT_AUTHORS[(seed + i) % COMMENT_AUTHORS.length],
      publishedAt: `2026-05-${day}T12:00:00.000Z`,
      body: COMMENT_TEMPLATES[index],
    };
  });
}
