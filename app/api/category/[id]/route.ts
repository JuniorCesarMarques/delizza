import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;


  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) {
    return NextResponse.json(
      { message: "Categoria não encontrada" },
      { status: 404 }
    );
  };

  return NextResponse.json(category);
}

export async function PATCH(request: Request, {params}: {params: Promise<{id: string}>}) {

  const { id } = await params;

  const { categoryName, imageUrl } = await request.json();

  const updatedCategory = await prisma.category.update({
    where: { id: id },
    data: {
      image: imageUrl,
      name: categoryName

    }
  });

  return NextResponse.json(updatedCategory)

}
