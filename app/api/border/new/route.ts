import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"


export async function POST(req: Request) {

    const data = await req.json()

  await prisma.border.create({
    data: data
  });  

  return NextResponse.json({message: "Borda criada com sucesso"});
}