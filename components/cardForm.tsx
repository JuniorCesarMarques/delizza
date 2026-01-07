"use client";

import { UseFormRegister } from "react-hook-form";

import { Inputs } from "@/app/gateway/[id]/page";

type CardFormType = {
  register: UseFormRegister<Inputs>;
};

export default function CardForm({ register }: CardFormType) {
  return (
    <div className="mt-5 flex flex-col gap-4">
      <div className="flex gap-3">
        <input
          {...register("cardName", { required: true })}
          placeholder="Nome no cartão"
          className="border p-2 rounded flex-1"
        />
        <input
          {...register("cardNumber", { required: true })}
          placeholder="Número do cartão"
          inputMode="numeric"
          className="border p-2 rounded flex-1"
        />
      </div>

      <div className="flex gap-2">
        <input
          {...register("expirationMonth", { required: true })}
          placeholder="MM"
          maxLength={2}
          className="border p-2 rounded flex-1"
        />
        <input
          {...register("expirationYear", { required: true })}
          placeholder="AA"
          maxLength={2}
          className="border p-2 rounded flex-1"
        />
      </div>

      <input
        {...register("securityCode", { required: true })}
        placeholder="CVV"
        inputMode="numeric"
        className="border p-2 rounded"
      />

      <div className="flex gap-3">
        <input
          {...register("cpf", { required: true })}
          placeholder="CPF do titular"
          className="border p-2 rounded flex-1"
        />
        <input
          className="border rounded flex-1 p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Digite seu email"
          type="text"
          {...register("email")}
        />
      </div>
    </div>
  );
}
