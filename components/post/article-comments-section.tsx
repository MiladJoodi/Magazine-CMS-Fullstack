"use client";

import { useState } from "react";

import { CommentForm } from "@/components/post/comment-form";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/format";
import type { Comment } from "@/lib/types/post";

type ArticleCommentsSectionProps = {
  postSlug: string;
  initialComments: Comment[];
  totalCount: number;
};

export function ArticleCommentsSection({
  postSlug,
  initialComments,
  totalCount,
}: ArticleCommentsSectionProps) {
  const [comments, setComments] = useState(initialComments);
  const [displayTotal, setDisplayTotal] = useState(totalCount);

  function handleCommentPosted(comment: Comment) {
    setComments((prev) => [comment, ...prev]);
    setDisplayTotal((count) => count + 1);
  }

  return (
    <section className="space-y-6" aria-labelledby="comments-heading">
      <div className="space-y-1">
        <h2 id="comments-heading" className="font-heading text-2xl font-semibold">
          Comments
        </h2>
        <p className="text-sm text-muted-foreground">
          Showing {comments.length} of {displayTotal.toLocaleString("en-US")} comments
        </p>
      </div>

      <CommentForm postSlug={postSlug} onCommentPosted={handleCommentPosted} />

      <div className="rounded-xl border bg-card">
        {comments.length === 0 ? (
          <p className="p-5 text-sm text-muted-foreground">
            No comments yet. Be the first to share your thoughts.
          </p>
        ) : (
          comments.map((comment, index) => (
            <div key={comment.id}>
              <article className="space-y-2 p-5">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-medium">{comment.author}</span>
                  <time
                    dateTime={comment.publishedAt}
                    className="text-xs text-muted-foreground"
                  >
                    {formatDate(comment.publishedAt)}
                  </time>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {comment.body}
                </p>
              </article>
              {index < comments.length - 1 ? <Separator /> : null}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
