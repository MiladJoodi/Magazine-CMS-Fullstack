import Link from "next/link";

import { TrendingItem } from "@/components/home/trending-item";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllCategories } from "@/lib/mock";
import { categoryHref } from "@/lib/category-url";
import type { Post } from "@/lib/types/post";
import { cn } from "@/lib/utils";

type SidebarProps = {
  trending: Post[];
  className?: string;
};

export function Sidebar({ trending, className }: SidebarProps) {
  const categories = getAllCategories();

  return (
    <aside className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Trending Now</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trending.map((post, index) => (
            <div key={post.id}>
              <TrendingItem post={post} rank={index + 1} />
              {index < trending.length - 1 ? (
                <Separator className="mt-4" />
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card id="categories">
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle className="text-lg">Categories</CardTitle>
          <Link
            href="/categories"
            className="text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            View all
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category.slug} variant="outline" render={<Link href={categoryHref(category.slug)} />}>
                {category.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
