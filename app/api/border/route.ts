import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"


export async function GET() {

    const borders = await prisma.border.findMany();

    return NextResponse.json(borders, {status: 200})
}