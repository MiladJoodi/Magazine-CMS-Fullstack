import Link from "next/link";

import { ImagePlaceholder } from "@/components/home/image-placeholder";
import { PostMeta } from "@/components/home/post-meta";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { postHref } from "@/lib/post-url";
import type { Post } from "@/lib/types/post";

type RelatedPostsProps = {
  posts: Post[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Related Stories</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {posts.map((post, index) => (
          <div key={post.id}>
            <article className="group flex gap-3">
              <ImagePlaceholder aspectRatio="square" className="w-20 shrink-0" />
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
            {index < posts.length - 1 ? <Separator className="mt-4" /> : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
