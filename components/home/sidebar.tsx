import { TrendingItem } from "@/components/home/trending-item";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "@/lib/data/mock-posts";
import type { Post } from "@/lib/types/post";
import { cn } from "@/lib/utils";

type SidebarProps = {
  trending: Post[];
  className?: string;
};

export function Sidebar({ trending, className }: SidebarProps) {
  return (
    <aside className={cn("space-y-6", className)} id="categories">
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

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Badge key={category} variant="outline">
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
