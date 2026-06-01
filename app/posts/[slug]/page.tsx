import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ImagePlaceholder } from "@/components/home/image-placeholder";
import { Sidebar } from "@/components/home/sidebar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ArticleBody } from "@/components/post/article-body";
import { ArticleComments } from "@/components/post/article-comments";
import { ArticleHeader } from "@/components/post/article-header";
import { PostBackLink } from "@/components/post/post-back-link";
import { RelatedPosts } from "@/components/post/related-posts";
import { Separator } from "@/components/ui/separator";
import { getCommentsForPost } from "@/lib/data/mock-comments";
import {
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
  getTrendingPosts,
} from "@/lib/data/mock-posts";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: `${post.title} | Northline`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(slug, 4);
  const trending = getTrendingPosts(5).filter((item) => item.slug !== slug);
  const comments = getCommentsForPost(slug, 5);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <PostBackLink />
        </div>

        <article className="border-b">
          <div className="mx-auto max-w-7xl px-4 pb-10">
            <div className="mx-auto max-w-3xl space-y-8">
              <ArticleHeader post={post} />
              <ImagePlaceholder aspectRatio="wide" />
              <ArticleBody post={post} />
            </div>
          </div>
        </article>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <Separator />
            <div className="mx-auto max-w-3xl">
              <ArticleComments comments={comments} totalCount={post.commentCount} />
            </div>
          </div>
          <aside className="space-y-6">
            <RelatedPosts posts={related} />
            <Sidebar trending={trending.slice(0, 4)} />
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
