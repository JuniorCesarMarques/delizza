import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {

  const orders = await prisma.order.findMany();

  return NextResponse.json(orders);
}


export async function POST(req: Request) {
  const body = await req.json();

  console.log(body, "BODY");


  console.log("BODY", body);


  const result = await prisma.order.create({
    data: {
        items: body.items,
        customer: body.email,
        total: body.total

    }
  });

  return NextResponse.json(result);
}
