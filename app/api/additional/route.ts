import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const additionals = await prisma.additional.findMany();

  return NextResponse.json(additionals);
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

