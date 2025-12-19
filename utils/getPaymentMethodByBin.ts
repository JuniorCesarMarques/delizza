export async function getPaymentMethodByBin(cardNumber: string) {
  if (!(window as any).MercadoPago) return null;

  const mp = new (window as any).MercadoPago(
    process.env.NEXT_PUBLIC_MP_PUBLIC_KEY
  );

  const bin = cardNumber.replace(/\s/g, "").substring(0, 6);

  const methods = await mp.getPaymentMethods({ bin });

  return methods?.results?.[0]?.id ?? null;
}
