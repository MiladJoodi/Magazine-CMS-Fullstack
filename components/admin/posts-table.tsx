"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import { CmsDeleteButton } from "@/components/admin/cms-delete-button";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { formatDate } from "@/lib/format";
import { deleteDemoPost, getAllPosts } from "@/lib/mock";
import type { Post } from "@/lib/types/post";
import { postHref } from "@/lib/post-url";

export function PostsTable() {
  const [posts, setPosts] = useState<Post[]>([]);

  const refresh = useCallback(() => {
    setPosts(
      getAllPosts().sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    );
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (posts.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-sm text-muted-foreground">
        No posts yet. Deleted posts are hidden in this demo (stored in your
        browser).
      </p>
    );
  }

  return (
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
                <div className="flex flex-wrap justify-end gap-2">
                  <ButtonLink
                    href={`/admin/posts/${post.slug}/edit`}
                    variant="outline"
                    size="sm"
                  >
                    <Pencil className="size-3.5" aria-hidden />
                    Edit
                  </ButtonLink>
                  <ButtonLink
                    href={postHref(post.slug)}
                    target="_blank"
                    variant="ghost"
                    size="sm"
                  >
                    View
                  </ButtonLink>
                  <CmsDeleteButton
                    itemLabel={post.title}
                    onDelete={() => deleteDemoPost(post.slug)}
                    onDeleted={refresh}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
