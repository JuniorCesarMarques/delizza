import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");

  if (category) {
    const products = await prisma.product.findMany({
      where: { category: { name: category } },
      include: {
        additionals: true,
        borders: true,
      },
    });

    const formatted = products.map((p) => ({
      ...p,
      price: Number(p.price).toFixed(2), // evita truncar casas
    }));

    return NextResponse.json(formatted);
  }

  const allProducts = await prisma.product.findMany();
  return Response.json(allProducts);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      description,
      price,
      category,
      imageUrl,
      additionals,
      borders,
    } = body;

    let additionalsArray;
    let bordersArray;

    // Caso venha false do front
    if (!additionals) {
      additionalsArray = [];
      bordersArray = [];
    } else {
      // Se for uma string se torna um array
      additionalsArray = Array.isArray(additionals)
        ? additionals
        : [additionals];

      bordersArray = Array.isArray(borders) ? borders : [borders];
    }

    if (!borders) {
      bordersArray = [];
    } else {
      // Se for uma string se torna um array
      bordersArray = Array.isArray(borders) ? borders : [borders];
    }

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
        price: priceNumber,
        additionals: {
          create: additionalsArray.map((additionalId: string) => ({
            additionalId,
          })),
        },
        borders: {
          create: bordersArray.map((borderId: string) => ({
            borderId,
          })),
        },
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
