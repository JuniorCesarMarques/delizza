"use client";

import CardForm from "@/components/cardForm";
import { useCart } from "@/context/cart/cartContext";
import { createCardToken } from "@/utils/createMpToken";
import { getPaymentMethodByBin } from "@/utils/getPaymentMethodByBin";
import Script from "next/script";
import { useState } from "react";
// import { getCoords } from "@/utils/getCoords";
// import { useEffect } from "react";
import { useForm } from "react-hook-form";

export type Inputs = {
  email: string;
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


export default function Gateway() {
  const { register, watch, handleSubmit } = useForm<Inputs>();

  const { total } = useCart();

  console.log(total, "TOTAL");

  console.log(watch("cpf"));

  const cardPayment = watch("paymentType");


  async function onSubmit(data: Inputs) {

    const result = await createCardToken(data);
    const paymentMethodId = await getPaymentMethodByBin(data.cardNumber);





    await fetch("/api/gateway", {
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
  }


  // useEffect(() => {
  //   const caller = async () => {
  //      const coords = await getCoords("Rua Gilson Francisco Rodrigues, 457, São Conrado, Tatuí, SP");
  //      console.log(coords)
  //   }

  //   caller();
   
  // }, [])

  const formatedPrice = total.toFixed(2).replace(".", ",");

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <p className="text-3xl font-bold text-center text-gray-800">
        Informações para finalizar seu pedido
      </p>

      {/* Telefone */}
      <div className="flex flex-col w-full">
        <label className="text-gray-600 font-semibold mb-1">
          Email
        </label>
        <input
          className="border rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Digite seu email"
          type="text"
          {...register("email")}
        />
      </div>

      <h1 className="text-gray-700 font-bold text-xl mt-2">Endereço</h1>

      {/* Grid do endereço */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold mb-1">Rua*</label>
          <input
            className="border rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Digite sua "
            type="text"
            {...register("street")}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold mb-1">Número*</label>
          <input
            className="border rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Digite o número"
            type="text"
            {...register("number")}
          />
        </div>

        <div className="flex flex-col sm:col-span-2">
          <label className="text-gray-600 font-semibold mb-1">Bairro*</label>
          <input
            className="border rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Digite o bairro"
            type="text"
            {...register("neighborhood")}
          />
        </div>
      </div>

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
        <p className="font-bold text-gray-700 text-lg">Total:</p>
        <span className="font-bold text-green-600 text-xl">
          R$ {formatedPrice}
        </span>
      </div>
      <button type="submit" className="bg-green-500 p-4 text-white text-lg">Finalizar compra</button>
    </form>
    </>
  );
}
