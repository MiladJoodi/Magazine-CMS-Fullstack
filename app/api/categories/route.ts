import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { createCategorySchema } from "@/lib/validations/category";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = createCategorySchema.safeParse(body);

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

  const existing = await prisma.category.findFirst({
    where: { OR: [{ slug }, { name: parsed.data.name }] },
  });

  if (existing) {
    return NextResponse.json(
      { error: "A category with this name already exists." },
      { status: 409 }
    );
  }

  const category = await prisma.category.create({
    data: { slug, name: parsed.data.name.trim(), description: parsed.data.description.trim() },
  });

  return NextResponse.json(category, { status: 201 });
}