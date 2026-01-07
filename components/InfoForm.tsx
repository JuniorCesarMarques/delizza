"use client";

import { useCart } from "@/context/cart/cartContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
    name: string;
    cep: string;
    street: string;
    number: string;
    neighborhood: string;
}

export default function InfoForm() {
  const { register, handleSubmit } = useForm<Inputs>();
  const router = useRouter();

  const cart = useCart();

  const onSubmit = async (data: Inputs) => {

    const res = await fetch("api/create-order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...data, cart})
    })

    if(!res.ok) {
        toast.error("Erro ao salvar dados");
        return
    }
     

    const { user, coords } = await res.json();

    console.log(user, coords);

    toast.success("Dados salvos com sucesso");
    router.push(`/gateway/${user.id}`);
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-30 px-10
    flex flex-col">
      <p className="text-3xl font-bold text-center text-gray-800 mb-4">
        Informações para finalizar seu pedido
      </p>

      {/* Informações */}
      <div className="flex flex-col w-full">
        <label className="text-gray-600 font-semibold mb-1">Nome*</label>
        <input
          className="border rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Digite seu nome"
          type="text"
          {...register("name")}
        />
      </div>

      <h1 className="text-gray-700 font-bold text-xl mt-2">Endereço</h1>

      {/* Grid do endereço */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold mb-1">CEP*</label>
          <input
            className="border rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Digite o CEP"
            type="text"
            {...register("cep")}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold mb-1">Rua*</label>
          <input
            className="border rounded-xl p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Digite sua rua"
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


        <button className="bg-green-500 p-4 text-white text-lg mt-4">
          Continuar
        </button>

    </form>
  );
}
