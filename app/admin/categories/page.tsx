"use client";

import { CategoriesTable } from "@/components/admin/categories-table";
import { CategoryForm } from "@/components/admin/category-form";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold">Categories</h1>
        <p className="text-muted-foreground">
          Manage topics stored in MongoDB.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
        <CategoryForm />
        <CategoriesTable />
      </div>
    </div>
  );
}