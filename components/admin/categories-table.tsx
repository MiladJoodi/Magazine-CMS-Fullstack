"use client";

import { useCallback, useEffect, useState } from "react";

import { CmsDeleteButton } from "@/components/admin/cms-delete-button";
import {
  canDeleteCategory,
  countPostsByCategory,
  deleteDemoCategory,
  getAllCategoriesMerged,
  getBaseCategories,
} from "@/lib/mock";
import type { Category } from "@/lib/types/category";

export function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>([]);

  const refresh = useCallback(() => {
    setCategories(getAllCategoriesMerged());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const baseSlugs = new Set(getBaseCategories().map((c) => c.slug));

  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50 text-left">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Slug</th>
            <th className="px-4 py-3 font-medium">Posts</th>
            <th className="px-4 py-3 font-medium">Source</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            const deletable = canDeleteCategory(category.slug);
            const postCount = countPostsByCategory(category.name);
            return (
            <tr key={category.slug} className="border-b last:border-0">
              <td className="px-4 py-3">
                <p className="font-medium">{category.name}</p>
                <p className="text-xs text-muted-foreground">
                  {category.description}
                </p>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {category.slug}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {countPostsByCategory(category.name)}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {baseSlugs.has(category.slug) ? "Mock data" : "Added in CMS"}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end">
                  <CmsDeleteButton
                    itemLabel={category.name}
                    disabled={!deletable}
                    disabledTitle={
                      postCount > 0
                        ? `${postCount} post(s) use this category`
                        : undefined
                    }
                    onDelete={() => deleteDemoCategory(category.slug)}
                    onDeleted={refresh}
                  />
                </div>
              </td>
            </tr>
          );
          })}
        </tbody>
      </table>
    </div>
  );
}
