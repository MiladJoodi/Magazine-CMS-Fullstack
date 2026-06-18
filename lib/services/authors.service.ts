import { Author } from "../types/author";

const BASE = "/api/authors";

export async function getAuthors(): Promise<Author[]> {
    const res = await fetch(BASE);
    if (!res.ok) throw new Error("Failed to load authors");
    return res.json();
}