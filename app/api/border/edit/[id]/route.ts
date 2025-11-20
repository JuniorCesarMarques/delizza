import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const border = await prisma.border.findUnique({ where: { id } });

  return NextResponse.json(border, { status: 200 });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await req.json();
  const { id } = await params;

  const border = await prisma.border.update({ where: { id }, data: body });

  return NextResponse.json(border, { status: 200 });
}
