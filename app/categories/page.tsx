import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCategories, getAllPosts } from "@/lib/mock";
import { categoryHref } from "@/lib/category-url";

export const metadata: Metadata = {
  title: "Categories | Northline",
  description: "Browse stories by topic — urbanism, culture, travel, and more.",
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  const posts = getAllPosts();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
          <header className="mb-10 max-w-2xl space-y-3">
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Categories
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore Northline stories by topic—from cities and media to travel
              and culture.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const count = posts.filter(
                (post) => post.category === category.name
              ).length;

              return (
                <Link key={category.slug} href={categoryHref(category.slug)}>
                  <Card className="h-full transition-colors hover:bg-muted/50">
                    <CardHeader>
                      <CardTitle className="font-heading text-lg">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {category.description}
                      </p>
                      <p className="text-xs font-medium text-muted-foreground">
                        {count} {count === 1 ? "story" : "stories"}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
