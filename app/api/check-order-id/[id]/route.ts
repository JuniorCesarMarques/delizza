import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, {params}: {params: Promise<{id: string}>}) {

  const { id } = await params;

  try {

    const order = await prisma.order.findFirst({
      where: {
        id,
      },
    });

    console.log(order, "ORDER");

    return NextResponse.json({ order });
  } catch (e) {
    console.log("ERRO", e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
