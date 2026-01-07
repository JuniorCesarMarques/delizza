"use client";

import CardForm from "@/components/cardForm";
import { useCart } from "@/context/cart/cartContext";
import { createCardToken } from "@/utils/createMpToken";
import { getPaymentMethodByBin } from "@/utils/getPaymentMethodByBin";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export type Inputs = {
  name: string;
  email: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  cardName: string;
  cardNumber: string
  expirationMonth: string;
  expirationYear: string;
  securityCode: string;
  cpf: string;
  paymentType: string;
  token: string;
  payment_method_id: string
}


export default function Gateway({params}: {params: {id: string}}) {
  const { register, watch, handleSubmit } = useForm<Inputs>();

  const { total, items } = useCart();

  const { id } = params;

  const cardPayment = watch("paymentType");
  const formatedPrice = total.toFixed(2).replace(".", ",");


  async function onSubmit(data: Inputs) {


    const result = await createCardToken(data);
    const paymentMethodId = await getPaymentMethodByBin(data.cardNumber);


    const res = await fetch(`/api/gateway/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: result.token,
        payment_method_id: paymentMethodId,
        amount: total,
        installments: 1,
        payer: {
          email: data.email,
          identification: {
            type: "CPF",
            number: data.cpf
          }
        }
      }),
    });

    if(!res.ok) {
      console.log("Erro na requisição de pagamento");
    }

    const mpRes = await res.json();


    if(mpRes.status !== "approved") {
      toast.error("Erro ao realizar pagamento")
    }

    toast.success("Pagamento aprovado");
    
  }


  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div>
        <h1 className="text-gray-700 font-bold text-xl mt-2">Forma de pagamento:</h1>
        <select 
        {...register("paymentType")}
        >
          <option value="">Escolha uma forma de pagamento</option>
          <option value="pix">Pix</option>
          <option value="card">Cartão de credito</option>
          <option value="inPerson">Na entrega</option>
        </select>
        {cardPayment === "card" && (
          <CardForm register={register} />
        )}
      </div>

      {/* Total */}
     <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border shadow-sm">
        <p className="font-bold text-gray-700 text-lg">Subtotal:</p>
        <span className="font-bold text-green-600 text-xl">
          R$ {formatedPrice}
        </span>
      </div>
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border shadow-sm">
        <p className="font-bold text-gray-700 text-lg">Entrega:</p>
        <span className="font-bold text-green-600 text-xl">
          R$ {formatedPrice}
        </span>
      </div>
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border shadow-sm">
        <p className="font-bold text-gray-700 text-lg">Total:</p>
        <span className="font-bold text-green-600 text-xl">
          R$ {formatedPrice}
        </span>
      </div>
      <button type="submit" className="bg-green-500 p-4 text-white text-lg">Finalizar compra</button>
    </form>
    </div>
  );
}
