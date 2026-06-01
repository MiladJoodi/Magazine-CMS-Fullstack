import Link from "next/link";

import { ImagePlaceholder } from "@/components/home/image-placeholder";
import { PostMeta } from "@/components/home/post-meta";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import { postHref } from "@/lib/post-url";
import type { Post } from "@/lib/types/post";

type FeaturedHeroProps = {
  post: Post;
};

export function FeaturedHero({ post }: FeaturedHeroProps) {
  return (
    <section className="border-b bg-muted/20">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-2 lg:items-center lg:gap-10">
        <ImagePlaceholder aspectRatio="wide" className="lg:order-2" />
        <div className="space-y-4 lg:order-1">
          <Badge variant="secondary">{post.category}</Badge>
          <h1 className="font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            <Link
              href={postHref(post.slug)}
              className="transition-colors hover:text-muted-foreground"
            >
              {post.title}
            </Link>
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <p className="text-sm text-muted-foreground">
            By {post.author} · {formatDate(post.publishedAt)}
          </p>
          <PostMeta viewCount={post.viewCount} commentCount={post.commentCount} />
        </div>
      </div>
    </section>
  );
}
