import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { name, description, imageUrl, category, price, additionals, borders } =
    await req.json();

  let additionalsArray;
  let bordersArray;

  // Caso venha false do front
  if (!additionals || !borders) {
    additionalsArray = [];
    bordersArray = [];
  } else {
    // Se for uma string se torna um array
    additionalsArray = Array.isArray(additionals) ? additionals : [additionals];
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
        create: additionalsArray.map((additionalId: string) => ({
            additionalId,
          })),
      },
      borders: {
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
