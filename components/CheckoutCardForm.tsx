"use client";

import { useEffect } from "react";

export default function CheckoutForm() {

  useEffect(() => {
    // Disponibiliza a integração somente depois que o script carregou
    if (window.MercadoPago) {
      const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, {
        locale: "pt-BR",
      });

      mp.cardForm({
        amount: "100",
        autoMount: true,
        form: {
          id: "form-checkout",
          cardNumber: { id: "form-checkout__cardNumber" },
          expirationDate: { id: "form-checkout__expirationDate" },
          securityCode: { id: "form-checkout__securityCode" },
          cardholderName: { id: "form-checkout__cardholderName" },
          cardholderEmail: { id: "form-checkout__cardholderEmail" },
          identificationType: { id: "form-checkout__identificationType" },
          identificationNumber: { id: "form-checkout__identificationNumber" },
          issuer: { id: "form-checkout__issuer" },
          installments: { id: "form-checkout__installments" },
        },
      });
    }
  }, []);

  const onSubmit = async (data: any) => {
    const formData = window.cardForm.getCardFormData();

    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        items: [{ title: "Pedido Delizza", quantity: 1, unit_price: 100 }],
        payer: { email: formData.cardholderEmail },
      }),
    });

    const pref = await res.json();

    window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${pref.id}`;
  };

  return (
    <form id="form-checkout"  className="space-y-4">

      <input id="form-checkout__cardNumber" placeholder="Número do cartão" className="border p-2 w-full" />

      <input id="form-checkout__expirationDate" placeholder="MM/AA" className="border p-2 w-full" />

      <input id="form-checkout__securityCode" placeholder="CVV" className="border p-2 w-full" />

      <input
        id="form-checkout__cardholderName"
        placeholder="Nome impresso"
        className="border p-2 w-full"
      />

      <input
        id="form-checkout__cardholderEmail"
        placeholder="E-mail"
        className="border p-2 w-full"
      />

      <select id="form-checkout__installments" className="border p-2 w-full"></select>

      <button onClick={onSubmit} className="bg-black text-white px-4 py-2 rounded">
        Pagar
      </button>
    </form>
  );
}
