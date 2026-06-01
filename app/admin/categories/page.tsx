"use client";

import { useState } from "react";

import { CategoriesTable } from "@/components/admin/categories-table";
import { CategoryForm } from "@/components/admin/category-form";

export default function AdminCategoriesPage() {
  const [tableKey, setTableKey] = useState(0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold">Categories</h1>
        <p className="text-muted-foreground">
          Topics for posts and the public categories index. New categories
          appear in the post editor; connect the API later to publish category
          pages automatically.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
        <CategoryForm onAdded={() => setTableKey((k) => k + 1)} />
        <CategoriesTable key={tableKey} />
      </div>
    </div>
  );
}
