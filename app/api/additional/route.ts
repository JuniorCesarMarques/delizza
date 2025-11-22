import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const additionals = await prisma.additional.findMany();

  const formatedData = additionals.map(additional => {
    return {
      ...additional,
      price: Number(additional.price).toFixed(2)
    }
  })


  return NextResponse.json(formatedData);
}

export async function POST(request: Request) {
  const { name, price } = await request.json(); // Lê o corpo da requisição

  await prisma.additional.create({
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

