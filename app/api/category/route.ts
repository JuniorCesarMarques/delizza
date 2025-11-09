import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { products: true },
  });

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const { categoryName, imageUrl } = await request.json();

  const newCategory = await prisma.category.create({
    data: {
      name: categoryName,
      imageUrl,
    },
  });

  return NextResponse.json(newCategory)
}

