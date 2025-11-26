"use client";

import { useCart } from "@/context/cart/cartContext";
import { useEffect } from "react";

export default function CheckoutForm() {

  const { total } = useCart();
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.MercadoPago) {
        clearInterval(interval);

        const mp = new window.MercadoPago(
          process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!,
          { locale: "pt-BR" }
        );

        const cardForm = mp.cardForm({
          amount: total, 
          autoMount: true,
          form: {
            id: "form-checkout",
            cardNumber: { id: "form-checkout__cardNumber" },
            expirationDate: { id: "form-checkout__expirationDate" },
            securityCode: { id: "form-checkout__securityCode" },
            cardholderName: { id: "form-checkout__cardholderName" },
            identificationType: { id: "form-checkout__identificationType" },
            identificationNumber: { id: "form-checkout__identificationNumber" },
            installments: { id: "form-checkout__installments" },
          },
        });

        window.cardForm = cardForm;
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const data = window.cardForm.getCardFormData();
    console.log("DADOS PARA O BACKEND:", data);

    // backend:
    // fetch("/api/pay", { method: "POST", body: JSON.stringify(data) })
  };

  return (
    <form id="form-checkout" onSubmit={onSubmit} className="p-4 space-y-4">

      <div>
        <label>Número do cartão</label>
        <input id="form-checkout__cardNumber" className="border p-2 w-full" />
      </div>

      <div>
        <label>Validade (MM/YY)</label>
        <input id="form-checkout__expirationDate" className="border p-2 w-full" />
      </div>

      <div>
        <label>CVV</label>
        <input id="form-checkout__securityCode" className="border p-2 w-full" />
      </div>

      <div>
        <label>Nome do Titular</label>
        <input id="form-checkout__cardholderName" className="border p-2 w-full" />
      </div>

      <div>
        <label>Tipo de documento</label>
        <select id="form-checkout__identificationType" className="border p-2 w-full" />
      </div>

      <div>
        <label>Número do documento</label>
        <input id="form-checkout__identificationNumber" className="border p-2 w-full" />
      </div>

      <div>
        <label>Parcelas</label>
        <select id="form-checkout__installments" className="border p-2 w-full" />
      </div>

      <button className="bg-green-600 text-white px-4 py-2 rounded mt-2 w-full">
        Finalizar pagamento
      </button>
    </form>
  );
}
