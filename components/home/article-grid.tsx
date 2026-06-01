import { ArticleCard } from "@/components/home/article-card";
import type { Post } from "@/lib/types/post";
import { cn } from "@/lib/utils";

type ArticleGridProps = {
  posts: Post[];
  className?: string;
};

export function ArticleGrid({ posts, className }: ArticleGridProps) {
  return (
    <section className={cn("space-y-6", className)}>
      <h2 className="font-heading text-2xl font-semibold tracking-tight">
        Latest Stories
      </h2>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
