import Link from "next/link";
import { Pencil, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import { getAllPosts } from "@/lib/mock";
import { postHref } from "@/lib/post-url";

export const metadata = {
  title: "Posts | Northline CMS",
};

export default function AdminPostsPage() {
  const posts = getAllPosts().sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold">Posts</h1>
          <p className="text-muted-foreground">
            Manage articles shown on the public site (mock data).
          </p>
        </div>
        <Button render={<Link href="/admin/posts/new" />}>
          <PlusCircle aria-hidden />
          New post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All posts ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left">
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Views</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b last:border-0">
                    <td className="max-w-xs px-4 py-3">
                      <p className="line-clamp-2 font-medium text-foreground">
                        {post.title}
                      </p>
                      {post.featured ? (
                        <Badge variant="secondary" className="mt-1">
                          Featured
                        </Badge>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {post.category}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(post.publishedAt)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {post.viewCount.toLocaleString("en-US")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          render={<Link href={`/admin/posts/${post.slug}/edit`} />}
                        >
                          <Pencil className="size-3.5" aria-hidden />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          render={<Link href={postHref(post.slug)} target="_blank" />}
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
