import type {
    Category,
    CreateCategoryInput,
    UpdateCategoryInput,
} from "@/lib/types/category";

const BASE = "/api/categories";

export async function getCategories(): Promise<Category[]> {
    const res = await fetch(BASE);
    if (!res.ok) throw new Error("Failed to load categories");
    return res.json();
}

export async function createCategory(
    input: CreateCategoryInput
): Promise<Category> {
    const res = await fetch(BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error ?? "Failed to create category");
    }

    return data as Category;
}

export async function deleteCategory(slug: string): Promise<void> {
    const res = await fetch(`${BASE}/${slug}`, { method: "DELETE" });
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error ?? "Failed to delete category");
    }
}

export async function updateCategory(
    slug: string,
    input: UpdateCategoryInput
): Promise<Category> {
    const res = await fetch(`${BASE}/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error ?? "Failed to update category");
    }
    return data as Category;
}