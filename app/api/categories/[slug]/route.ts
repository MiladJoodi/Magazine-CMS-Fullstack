import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
    console.log("context:", context);
    console.log("params:", await context.params);
  const { slug } = await context.params;

  const category = await prisma.category.findUnique({ where: { slug } });

  if (!category) {
    return NextResponse.json({ error: "Category not found." }, { status: 404 });
  }

  // وقتی Post model داشتی، اینجا چک کن postCount > 0

//   await prisma.category.delete({ where: { slug } });

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request, context: RouteContext) {
    const { slug } = await context.params;
    const body = await request.json();
  
    const name = String(body.name ?? "").trim();
    const description = String(body.description ?? "").trim();
  
    if (!name || !description) {
      return NextResponse.json(
        { error: "Name and description are required." },
        { status: 400 }
      );
    }
  
    const category = await prisma.category.findUnique({ where: { slug } });
  
    if (!category) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }
  
    const nameTaken = await prisma.category.findFirst({
      where: { name, NOT: { slug } },
    });
  
    if (nameTaken) {
      return NextResponse.json(
        { error: "Another category already uses this name." },
        { status: 409 }
      );
    }
  
    const updated = await prisma.category.update({
      where: { slug },
      data: { name, description },
    });
  
    return NextResponse.json(updated);
  }