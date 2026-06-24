"use client";

import { AuthorForm } from "@/components/admin/author-form";
import { AuthorsTable } from "@/components/admin/authors-table";

export default function AdminAuthorsPage() {

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold">Authors</h1>
        <p className="text-muted-foreground">
          Manage bylines for posts. Authors added here appear in the post editor
          dropdown. Future: link to <code className="text-xs">author</code> user
          role and accounts.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
        <AuthorForm />
        <AuthorsTable />
      </div>
    </div>
  );
}
