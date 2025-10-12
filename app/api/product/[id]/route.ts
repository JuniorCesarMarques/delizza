import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params;
  
  const product = await prisma.product.findUnique({where: {id: id}});



  return NextResponse.json(product);
}
