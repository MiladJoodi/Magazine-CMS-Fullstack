import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const description = String(body.description ?? "").trim();

  if (!name || !description) {
    return NextResponse.json(
      { error: "Name and description are required." },
      { status: 400 }
    );
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const existing = await prisma.category.findFirst({
    where: { OR: [{ slug }, { name }] },
  });

  if (existing) {
    return NextResponse.json(
      { error: "A category with this name already exists." },
      { status: 409 }
    );
  }

  const category = await prisma.category.create({
    data: { slug, name, description },
  });

  return NextResponse.json(category, { status: 201 });
}