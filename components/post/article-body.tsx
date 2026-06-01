import type { PostDetail } from "@/lib/types/post";

type ArticleBodyProps = {
  post: PostDetail;
};

export function ArticleBody({ post }: ArticleBodyProps) {
  return (
    <div className="max-w-none font-serif">
      {post.body.map((paragraph, index) => (
        <p
          key={index}
          className="mb-5 text-base leading-relaxed text-foreground last:mb-0 sm:text-[1.125rem] sm:leading-8"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
