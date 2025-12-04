"use client";

import { useForm } from "react-hook-form";

export default function Gateway() {
  const { register } = useForm();

  return (
    <form className="flex flex-col items-center gap-5">
      <p className="text-2xl font-bold">
        Informações para finalizar seu pedido
      </p>
      <div className="flex flex-col items-center">
        <label className="text-gray-500 font-bold">Número de telefone</label>
        <input
          className="border rounded p-2"
          placeholder="Digite seu número de telefone"
          type="text"
          {...register("phone")}
        />
      </div>
      <div className="flex flex-col items-center">
        <label className="text-gray-500 font-bold">Endereço</label>
        <input
          className="border rounded p-2"
          placeholder="Digite seu endereço"
          type="text"
          {...register("address")}
        />
      </div>
    </form>
  );
}
