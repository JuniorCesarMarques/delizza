import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {

    const categories = await prisma.category.findMany();

    return NextResponse.json(categories);
}

export async function POST(request: Request) {
    const { categoryName } = await request.json();


    const newCategory = await prisma.category.create({
        data: {
            name: categoryName,
        },
    });

    return NextResponse.json(newCategory);

}    

