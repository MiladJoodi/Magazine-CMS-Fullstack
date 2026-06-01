"use client";

import { PlusCircle } from "lucide-react";

import { PostsTable } from "@/components/admin/posts-table";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold">Posts</h1>
          <p className="text-muted-foreground">
            Manage articles on the public site. Deletes are stored in your
            browser for this demo.
          </p>
        </div>
        <ButtonLink href="/admin/posts/new">
          <PlusCircle aria-hidden />
          New post
        </ButtonLink>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All posts</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <PostsTable />
        </CardContent>
      </Card>
    </div>
  );
}
