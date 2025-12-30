import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(req: Request) {

    const { cus } = await req.json();

    const order = await prisma.order.create({
        data: {
            customer: 
        }
    })
}

export async function GET() {

    const orders = await prisma.order.findMany();


    return NextResponse.json(orders);
}