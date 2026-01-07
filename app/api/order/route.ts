import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {

    const orders = await prisma.order.findMany({
        include: {
            items: true
        }
    });


    return NextResponse.json(orders);
}