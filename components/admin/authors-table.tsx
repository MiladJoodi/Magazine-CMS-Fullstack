"use client";

import { useAuthors } from "@/lib/hooks/use-authors";

export function AuthorsTable() {
  const { data: authors = [], isLoading, error } = useAuthors();

  if (isLoading) {
    return (
      <p className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
        Loading authors...
      </p>
    );
  }

  if (error) {
    return (
      <p
        className="rounded-xl border bg-card p-4 text-sm text-destructive"
        role="alert"
      >
        {error.message}
      </p>
    );
  }

  if (authors.length === 0) {
    return (
      <p className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
        No authors yet. Add one with the form.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50 text-left">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Slug</th>
            <th className="px-4 py-3 font-medium">Posts</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.slug} className="border-b last:border-0">
              <td className="px-4 py-3">
                <p className="font-medium">{author.name}</p>
                {author.bio ? (
                  <p className="text-xs text-muted-foreground">{author.bio}</p>
                ) : null}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{author.slug}</td>
              <td className="px-4 py-3 text-muted-foreground">—</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}