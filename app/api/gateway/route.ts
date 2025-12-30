import { NextResponse } from "next/server";
import MercadoPagoConfig, { Payment } from "mercadopago";


const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  const body = await req.json()

  console.log(body, "BODY");

  const payment = new Payment(client);

  console.log("BODY", body);


  const result = await payment.create({
    body: {
      transaction_amount: body.amount,
      description: "Pedido Loja XYZ",
      installments: body.installments,
      token: body.token,
      payer: {
        email: body.payer.email,
        identification: {
          type: "CPF",
          number: body.payer.cpf,
        },
      },
    },
  });



  return NextResponse.json(result);
}
