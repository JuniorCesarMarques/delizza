import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { name, description, imageUrl, category, price } = await req.json();
  const { id } = await params;

  await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      imageUrl,
      categoryId: category,
      price,
    },
  });

  return NextResponse.json(
    { message: "Produto editado com secesso" },
    { status: 200 }
  );
}
