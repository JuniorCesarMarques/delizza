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
      image: imageUrl,
    },
  });

  return NextResponse.json(newCategory);
}

export async function PATCH(request: Request, {params}: {params: {id: string}}) {

  const id = params.id;

  const body = await request.json();

  const updatedCategory = await prisma.category.update({
    where: { id: id },
    data: body
  })

  return NextResponse.json(updatedCategory);

}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return Response.json({ error: "ID é obrigatório" }, { status: 400 });
    }

    await prisma.category.delete({ where: { id } });

    return NextResponse.json(
      { message: "Categoria excluida com sucesso!" },
      { status: 200 }
    );
  } catch (err: any) {
    console.dir(err, { depth: null });

    return NextResponse.json(
      {
        error: err,
      },
      { status: 400 }
    );
  }
}
