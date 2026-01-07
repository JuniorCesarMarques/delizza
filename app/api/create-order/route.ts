import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { haversineKm } from "@/utils/haversineKm";
import { feeCalculator } from "@/utils/feeCalculator";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const user = await prisma.customer.create({
    data: {
      name: body.name,
      addresses: {
        create: {
          cep: body.cep,
          neighborhood: body.neighborhood,
          number: body.number,
          street: body.street,
        },
      },
    },
  });

  const formatedAddress = `Rua ${body.street}, ${body.number}, Tatuí, SP, Brasil`;

  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
    formatedAddress
  )}`;

  try {
    const res = await fetch(url, {
      headers: {
        // OBRIGATÓRIO PELO NOMINATIM
        "User-Agent": "meu-app/1.0 (contato@meuapp.com)",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Erro ao consultar geolocalização" },
        { status: 500 }
      );
    }

    const data = await res.json();

    if (!data.length) {
      return NextResponse.json(
        { error: "Endereço não encontrado" },
        { status: 404 }
      );
    }

    const location = data[0];

    const customerCoords = {
      lat: Number(location.lat),
      lon: Number(location.lon),
      displayName: location.display_name,
    };

    const STORE_COORDS = {
      lat: -23.3501511,
      lon: -47.8487706,
    };

    const distance = haversineKm(customerCoords.lat, customerCoords.lon, STORE_COORDS.lat, STORE_COORDS.lon);
    const fee = feeCalculator(distance);

    console.log("ITEM", body.cart.total);



    const order = await prisma.order.create({
      data: {
        deliveryFee: fee,
        subtotal: body.cart.total,
        total: Number(body.cart.total) + fee,
        customer: body.name,
        items: {
          create: body.cart.items.map((i: any) => ({
            productName: i.name,
            type: i.type.toUpperCase(),
            quantity: i.quantity,
            unitPrice: i.price,
            totalPrice: Number(i.price) * Number(i.quantity)
          }))
        }
      }
    })

    return NextResponse.json({ user, fee });
  } catch (error) {
    console.log("ERROR", error);
    return NextResponse.json({ error: "Falha inesperada" }, { status: 500 });
    
  }
}
