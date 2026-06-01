export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  viewCount: number;
  commentCount: number;
  featured?: boolean;
};

export type PostDetail = Post & {
  body: string[];
  readMinutes: number;
};

export type Comment = {
  id: string;
  author: string;
  publishedAt: string;
  body: string;
};
