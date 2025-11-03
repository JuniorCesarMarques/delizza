import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;

  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) {
    return NextResponse.json(
      { message: "Categoria não encontrada" },
      { status: 500 }
    );
  }

  return NextResponse.json(category);
}
