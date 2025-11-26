import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";


export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log(body, "BODY")

    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
    });

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: body.mpItems,
      },
    });

    return NextResponse.json({
      id: response.id,
      init_point: response.init_point,
      sandbox: response.sandbox_init_point,
    });
  } catch (error: unknown) {
    console.error("ERRO MP:", error);
    return NextResponse.json(
      { error: "Erro ao criar pagamento" },
      { status: 500 }
    );
  }
}
