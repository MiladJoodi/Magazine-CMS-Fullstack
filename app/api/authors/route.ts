import { prisma } from "@/lib/prisma/client";
import { NextResponse } from "next/server";


export async function GET() {
    const authors = await prisma.author.findMany({
        orderBy: { name: "asc" },
    })
    return NextResponse.json(authors)
}