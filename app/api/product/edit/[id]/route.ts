import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { name, description, imageUrl, category, price, additionals, borders } =
    await req.json();

    console.log("ADDITIONALS E BORDERS VINDO DO FRONT", additionals, borders);

  let additionalsArray;
  let bordersArray;

  // Caso venha false do front
  if (!additionals) {
    additionalsArray = [];
  } else {
    // Se for uma string se torna um array
    additionalsArray = Array.isArray(additionals) ? additionals : [additionals];
    
  }

  if(!borders) {
    bordersArray = [];
  } else {
    bordersArray = Array.isArray(borders) ? borders : [borders];
  }


  const priceString = String(price).replace(",", ".");
  const priceNumber = parseFloat(priceString);

  const { id } = await params;

  await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      imageUrl,
      categoryId: category,
      price: priceNumber,
      additionals: {
        deleteMany: {},
        create: additionalsArray.map(additionalId => ({
         additionalId
        }))
      },
      borders: {
        deleteMany: {},
        create: bordersArray.map((borderId: string) => ({
          borderId,
        })),
      }
    },
  });


  return NextResponse.json(
    { message: "Produto editado com secesso" },
    { status: 200 }
  );
}
