import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { createAuthorSchema } from "@/lib/validations/author";


export async function GET() {
    const authors = await prisma.author.findMany({
        orderBy: { name: "asc" },
    })
    return NextResponse.json(authors)
}

export async function POST(request: Request) {
    const body = await request.json();
    const parsed = createAuthorSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: parsed.error.issues[0].message },
            { status: 400 }
        );
    }

    const slug = parsed.data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const existing = await prisma.author.findFirst({
        where: { OR: [{ slug }, { name: parsed.data.name }] },
    })
    if (existing) {
        return NextResponse.json({ error: "An author with this name already exists." }, { status: 409 })
    }

    const author = await prisma.author.create({
        data: {
            slug,
            name: parsed.data.name.trim(),
            bio: parsed.data.bio?.trim() || undefined
        },
    })

    return NextResponse.json(author, { status: 201 })
}