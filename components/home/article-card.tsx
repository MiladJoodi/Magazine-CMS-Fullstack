import Link from "next/link";

import { ImagePlaceholder } from "@/components/home/image-placeholder";
import { PostMeta } from "@/components/home/post-meta";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import { postHref } from "@/lib/post-url";
import type { Post } from "@/lib/types/post";
import { cn } from "@/lib/utils";

type ArticleCardProps = {
  post: Post;
  className?: string;
};

export function ArticleCard({ post, className }: ArticleCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col gap-4 rounded-xl border bg-card p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:gap-6",
        className
      )}
    >
      <ImagePlaceholder
        aspectRatio="square"
        className="w-full sm:w-36 md:w-44"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Badge variant="secondary" className="w-fit">
          {post.category}
        </Badge>
        <h2 className="font-heading text-xl font-semibold leading-snug">
          <Link
            href={postHref(post.slug)}
            className="transition-colors group-hover:text-muted-foreground"
          >
            {post.title}
          </Link>
        </h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <p className="text-xs text-muted-foreground">
          {post.author} · {formatDate(post.publishedAt)}
        </p>
        <PostMeta
          viewCount={post.viewCount}
          commentCount={post.commentCount}
          size="sm"
        />
      </div>
    </article>
  );
}
