import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";


export async function GET() {
    const authors = await prisma.author.findMany({
        orderBy: { name: "asc" },
    })
    return NextResponse.json(authors)
}