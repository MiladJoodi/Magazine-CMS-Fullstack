"use client";

import { useCallback, useEffect, useState } from "react";

import {
  countPostsByAuthor,
  getAllAuthorsMerged,
  getBaseAuthors,
} from "@/lib/mock";
import type { Author } from "@/lib/types/author";

export function AuthorsTable() {
  const [authors, setAuthors] = useState<Author[]>([]);

  const refresh = useCallback(() => {
    setAuthors(getAllAuthorsMerged());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const baseIds = new Set(getBaseAuthors().map((a) => a.id));

  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50 text-left">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Slug</th>
            <th className="px-4 py-3 font-medium">Posts</th>
            <th className="px-4 py-3 font-medium">Source</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id} className="border-b last:border-0">
              <td className="px-4 py-3">
                <p className="font-medium">{author.name}</p>
                {author.bio ? (
                  <p className="text-xs text-muted-foreground">{author.bio}</p>
                ) : null}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{author.slug}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {countPostsByAuthor(author.name)}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {baseIds.has(author.id) ? "Mock data" : "Added in CMS"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
