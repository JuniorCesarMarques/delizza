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
  const { id } = await params;

  await prisma.product.delete({ where: { id } });

  return NextResponse.json(
    { message: "Produto excluido com secesso" },
    { status: 200 }
  );
}
