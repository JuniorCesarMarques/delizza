import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");

  if (category) {
    const products = await prisma.product.findMany({
      where: { category: { name: category } },
    });

      // Converte Decimal para string antes de retornar
  const formatted = products.map((p) => ({
    ...p,
    price: p.price.toString(), // evita truncar casas
  }));

    return NextResponse.json(formatted);
  }

  console.log("ENTROU AQIU")
  const allProducts = await prisma.product.findMany();
  return Response.json(allProducts);
}

export async function POST(req: NextRequest) {
  console.log("ENTROU NO HANDLER");

  try {
    const body = await req.json();

    const { name, description, price, category, imageUrl } = body;

    const priceString = String(price).replace(",", ".");
    const priceNumber = parseFloat(priceString);

    const categoryCol = await prisma.category.findFirst({
      where: { id: category },
    });

    if (!categoryCol) {
      return NextResponse.json(
        { error: "Categoria inválida" },
        { status: 400 }
      );
    }

    if (!name || !price || !category) {
      return NextResponse.json(
        { error: "Campos obrigatórios: nome, preço e categoria" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        imageUrl,
        categoryId: categoryCol.id,
        price: priceNumber
      },
    });

    return NextResponse.json({ product: product }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Erro ao criar produto" },
      { status: 500 }
    );
  }
}
