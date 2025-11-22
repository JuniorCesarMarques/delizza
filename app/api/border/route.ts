import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const half1 = searchParams.get("half1") ?? undefined;
  const half2 = searchParams.get("half2") ?? undefined;

  console.log("HALF1", half1, "HALF2", half2);

  if (!half1 && !half2) {
    const borders = await prisma.border.findMany();

    return NextResponse.json(borders, { status: 200 });
  }

  if (half1 && !half2) {
    const borders = await prisma.border.findMany({
      where: {
        products: {
          some: {productId: half1}
        }
      },
    });

    return NextResponse.json(borders);
  }

  const borders = await prisma.border.findMany({
    where: {
      products: {
        some: { productId: half1 },
      },
      AND: {
        products: {
          some: { productId: half2 },
        },
      },
    },
  });

  return NextResponse.json(borders);
}
