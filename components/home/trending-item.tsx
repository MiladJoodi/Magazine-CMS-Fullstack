import Link from "next/link";

import { ImagePlaceholder } from "@/components/home/image-placeholder";
import { PostMeta } from "@/components/home/post-meta";
import { postHref } from "@/lib/post-url";
import type { Post } from "@/lib/types/post";

type TrendingItemProps = {
  post: Post;
  rank: number;
};

export function TrendingItem({ post, rank }: TrendingItemProps) {
  return (
    <article className="group flex gap-3">
      <span className="mt-1 w-5 shrink-0 text-sm font-semibold text-muted-foreground">
        {rank}
      </span>
      <ImagePlaceholder aspectRatio="square" className="w-16 shrink-0" />
      <div className="min-w-0 flex-1 space-y-1">
        <h3 className="font-heading text-sm font-medium leading-snug">
          <Link
            href={postHref(post.slug)}
            className="line-clamp-2 transition-colors group-hover:text-muted-foreground"
          >
            {post.title}
          </Link>
        </h3>
        <PostMeta
          viewCount={post.viewCount}
          commentCount={post.commentCount}
          size="sm"
        />
      </div>
    </article>
  );
}
