import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/home/article-card";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getAllCategories, getCategoryBySlug, getPostsByCategory } from "@/lib/mock";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category not found" };
  }

  return {
    title: `${category.name} | Northline`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategory(slug);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link href="/categories" className="hover:text-foreground">
              Categories
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{category.name}</span>
          </nav>

          <header className="mb-10 max-w-2xl space-y-3">
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {category.name}
            </h1>
            <p className="text-lg text-muted-foreground">{category.description}</p>
            <p className="text-sm text-muted-foreground">
              {posts.length} {posts.length === 1 ? "story" : "stories"}
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="text-muted-foreground">No stories in this category yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
