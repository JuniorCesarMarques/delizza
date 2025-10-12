import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  
  const product = await prisma.product.findUnique({where: {id: params.id}});



  return NextResponse.json(product);
}
