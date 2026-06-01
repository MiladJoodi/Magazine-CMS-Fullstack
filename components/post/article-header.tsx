import { Clock } from "lucide-react";

import { PostMeta } from "@/components/home/post-meta";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import type { PostDetail } from "@/lib/types/post";

type ArticleHeaderProps = {
  post: PostDetail;
};

export function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <header className="space-y-4">
      <Badge variant="secondary">{post.category}</Badge>
      <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        {post.title}
      </h1>
      <p className="text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">By {post.author}</span>
        <span aria-hidden>·</span>
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span aria-hidden>·</span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-4" aria-hidden />
          {post.readMinutes} min read
        </span>
      </div>
      <PostMeta viewCount={post.viewCount} commentCount={post.commentCount} />
    </header>
  );
}
