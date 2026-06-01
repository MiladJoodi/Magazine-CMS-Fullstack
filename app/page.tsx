import { ArticleGrid } from "@/components/home/article-grid";
import { FeaturedHero } from "@/components/home/featured-hero";
import { Sidebar } from "@/components/home/sidebar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  getFeaturedPost,
  getLatestPosts,
  getTrendingPosts,
} from "@/lib/data/mock-posts";

export default function Home() {
  const featured = getFeaturedPost();
  const posts = getLatestPosts(6);
  const trending = getTrendingPosts(5);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <FeaturedHero post={featured} />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-3">
          <ArticleGrid posts={posts} className="lg:col-span-2" />
          <Sidebar trending={trending} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
