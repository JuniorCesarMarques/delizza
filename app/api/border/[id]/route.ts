import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "ID é obrigatório" }, { status: 400 });
  }

  await prisma.border.delete({
    where: { id },
  });

  return NextResponse.json({message: "Borda excluida com sucesso"}, {status: 200});
}
