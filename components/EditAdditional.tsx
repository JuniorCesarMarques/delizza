"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Additional } from "@/lib/types"
import { AdditionalSchema, additionalSchema } from "@/lib/validations/additional";
import { zodResolver } from "@hookform/resolvers/zod";

export default function EditAdditional({additional}: {additional: Additional}) {


    const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AdditionalSchema>({ resolver: zodResolver(additionalSchema) });

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch(`/api/additional/${additional.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Erro no servidor: ${res.status}`);
      }

      toast.success("Adicional editado com sucesso");
      router.push("/additionals");
    } catch (err) {
        toast.error("Ocorreu um erro");
    }
  };

  useEffect(() => {
    setValue("name", additional.name)
    setValue("price", additional.price)
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mb-4">
        <label className="mb-1 text-gray-700 font-medium text-sm">
          Nome do adicional
        </label>
        <input
          className="border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
          type="text"
          placeholder="Digite o nome do adicional"
          {...register("name")}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-1 text-gray-700 font-medium text-sm">
          Preço do adicional
        </label>
        <input
          className="border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
          type="text"
          placeholder="Digite o preço do adicional"
          {...register("price")}
        />
      </div>
      <button className="bg-red-600 text-white rounded-lg py-2 px-4 hover:bg-red-700 transition">
        Editar Adicional
      </button>
    </form>
  );
}
