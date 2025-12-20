import { Inputs } from "@/app/gateway/page";

export async function createCardToken(data: Inputs) {
  // garante que o SDK carregou
  if (!(window as any).MercadoPago) {
    throw new Error("Mercado Pago SDK não carregado");
  }

  const mp = new (window as any).MercadoPago(
    process.env.NEXT_PUBLIC_MP_PUBLIC_KEY,
    { locale: "pt-BR" }
  );

  const result = await mp.createCardToken({
    cardNumber: data.cardNumber.replace(/\s/g, ""),
    cardExpirationMonth: data.expirationMonth,
    cardExpirationYear: data.expirationYear,
    securityCode: data.securityCode,
    cardholderName: data.cardName,
    identificationType: "CPF",
    identificationNumber: data.cpf.replace(/\D/g, ""),
  });

  console.log("RESULT", result)

  if (result.error) {
    console.error(result);
    throw new Error("Erro ao criar token do cartão");
  }

  return {
    token: result.id,
    payment_method_id: result.payment_method_id,
  };
}
