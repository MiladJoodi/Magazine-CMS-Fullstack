import Link from "next/link";
import { Eye, FileText, MessageSquare, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPosts } from "@/lib/mock";
import { postHref } from "@/lib/post-url";

export const metadata = {
  title: "Dashboard | Northline CMS",
};

export default function AdminDashboardPage() {
  const posts = getAllPosts();
  const totalViews = posts.reduce((sum, post) => sum + post.viewCount, 0);
  const totalComments = posts.reduce((sum, post) => sum + post.commentCount, 0);
  const featured = posts.find((post) => post.featured);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your magazine content.</p>
        </div>
        <Button render={<Link href="/admin/posts/new" />}>
          <PlusCircle aria-hidden />
          New post
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total posts
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <FileText className="size-5 text-muted-foreground" aria-hidden />
            <span className="text-3xl font-semibold">{posts.length}</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total views
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Eye className="size-5 text-muted-foreground" aria-hidden />
            <span className="text-3xl font-semibold">
              {totalViews.toLocaleString("en-US")}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total comments
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <MessageSquare className="size-5 text-muted-foreground" aria-hidden />
            <span className="text-3xl font-semibold">
              {totalComments.toLocaleString("en-US")}
            </span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Featured story</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {featured ? (
            <>
              <p className="font-medium">{featured.title}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{featured.category}</Badge>
                <Button variant="link" size="sm" className="h-auto p-0" render={<Link href={postHref(featured.slug)} target="_blank" />}>
                  View on site
                </Button>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No featured post set.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
