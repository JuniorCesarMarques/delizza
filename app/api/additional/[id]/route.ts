import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const additional = await prisma.additional.findFirst({
    where: { id },
  });

  if (additional) {
    const formated = { ...additional, price: additional.price.toFixed(2) };
    return NextResponse.json(formated);
  }

  return NextResponse.json({ message: "Nenhum produto adicional encontrado" });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { name, price } = await request.json(); // Lê o corpo da requisição

  await prisma.additional.update({
    where: { id },
    data: {
      name,
      price,
    },
  });

  return NextResponse.json(
    { message: "Adicional criado com sucesso!" },
    { status: 201 }
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "ID não informado" }, { status: 400 });
  }

  await prisma.additional.delete({ where: { id } });
  return NextResponse.json(
    { message: "Adicional excluido com sucesso" },
    { status: 200 }
  );
}
