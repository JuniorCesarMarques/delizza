import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id: id },
    include: {
      additionals: true,
      borders: true,
    },
  });

  const formated = { ...product, price: product?.price.toFixed(2) };

  return NextResponse.json(formated);
}


export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 1. Validação do ID
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "ID inválido ou ausente." },
        { status: 400 }
      );
    }

    const deleted = await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        message: "Produto excluído com sucesso.",
        deletedId: deleted.id,
      },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error("Erro ao excluir produto:", error);


    return NextResponse.json(
      { error: "Erro interno ao excluir o produto." },
      { status: 500 }
    );
  }
}

