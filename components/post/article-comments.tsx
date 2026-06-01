import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/format";
import type { Comment } from "@/lib/types/post";

type ArticleCommentsProps = {
  comments: Comment[];
  totalCount: number;
};

export function ArticleComments({ comments, totalCount }: ArticleCommentsProps) {
  return (
    <section className="space-y-6" aria-labelledby="comments-heading">
      <div className="space-y-1">
        <h2 id="comments-heading" className="font-heading text-2xl font-semibold">
          Comments
        </h2>
        <p className="text-sm text-muted-foreground">
          Showing {comments.length} of {totalCount.toLocaleString("en-US")} comments
        </p>
      </div>

      <div className="rounded-xl border bg-card">
        {comments.map((comment, index) => (
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
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Comment posting will be enabled when the API is connected.
      </p>
    </section>
  );
}
