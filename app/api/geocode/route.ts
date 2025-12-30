import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json(
      { error: "Endereço não informado" },
      { status: 400 }
    );
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
    address
  )}`;

  console.log("URL", url);

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

    return NextResponse.json({
      lat: Number(location.lat),
      lon: Number(location.lon),
      displayName: location.display_name,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha inesperada" },
      { status: 500 }
    );
  }
}
