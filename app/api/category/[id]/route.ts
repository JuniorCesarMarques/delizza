import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) {
    return NextResponse.json(
      { message: "Categoria não encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(category);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { categoryName, imageUrl } = await request.json();

  const updatedCategory = await prisma.category.update({
    where: { id: id },
    data: {
      imageUrl,
      name: categoryName,
    },
  });

  return NextResponse.json(updatedCategory);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    console.log("ID", id)

    if (!id) {
      return Response.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    await prisma.category.delete({ where: { id } });

    return NextResponse.json(
      { message: "Categoria excluida com sucesso!" },
      { status: 200 }
    );
  } catch (err) {
    console.dir(err, { depth: null });

    return NextResponse.json(
      {
        error: err,
      },
      { status: 400 }
    );
  }
}
