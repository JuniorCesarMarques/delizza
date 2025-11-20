"use client";

import { additionalSchema, AdditionalSchema } from "@/lib/validations/additional";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function NewAdditional() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AdditionalSchema>({resolver: zodResolver(additionalSchema)});

  const onSubmit: SubmitHandler<AdditionalSchema> = async (data) => {
    try {
      const res = await fetch(`/api/additional`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Erro no servidor: ${res.status}`);
      }

      toast.success("Adicional criado com sucesso")
    } catch (err) {
        toast.error("Ocorreu um erro");
    }
  };

  console.log(errors)
  console.log("WATCH", watch("price"));

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
        <span className="text-red-500 font-bold text-sm">{errors.name?.message}</span>
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
        <span className="text-red-500 font-bold text-sm">{errors.price?.message}</span>
      </div>
      <button className="bg-red-600 text-white rounded-lg py-2 px-4 hover:bg-red-700 transition">
        Criar Adicional
      </button>
    </form>
  );
}
