"use client";

import { CmsDeleteButton } from "@/components/admin/cms-delete-button";
import { useCategories, useDeleteCategory } from "@/lib/hooks/use-categories";

export function CategoriesTable() {
  const { data: categories = [], isLoading, error } = useCategories();
  const deleteCategory = useDeleteCategory();

  async function handleDelete(slug: string) {
    try {
      await deleteCategory.mutateAsync(slug);
      return { ok: true as const };
    } catch (err) {
      return {
        ok: false as const,
        error: err instanceof Error ? err.message : "Failed to delete.",
      };
    }
  }

  if (isLoading) {
    return (
      <p className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
        Loading categories...
      </p>
    );
  }

  if (error) {
    return (
      <p className="rounded-xl border bg-card p-4 text-sm text-destructive" role="alert">
        {error.message}
      </p>
    );
  }

  if (categories.length === 0) {
    return (
      <p className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
        No categories yet. Add one with the form.
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
            <th className="px-4 py-3 font-medium">Description</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.slug} className="border-b last:border-0">
              <td className="px-4 py-3">
                <p className="font-medium">{category.name}</p>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{category.slug}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {category.description}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end">
                  <CmsDeleteButton
                    itemLabel={category.name}
                    disabled={deleteCategory.isPending}
                    onDelete={() => handleDelete(category.slug)}
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