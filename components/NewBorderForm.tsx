"use client";

import { borderSchema, BorderSchema } from "@/lib/validations/border";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

export default function NewBorderForm() {

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BorderSchema>({
    resolver: zodResolver(borderSchema),
  });

  const onSubmit = async (data: BorderSchema) => {

    try {
      const res = await fetch(`/api/border/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if(!res) {
      toast.error("Ocorreu um erro!");
      throw new Error("Erro ao criar borda");
    }

    toast.success("Borda criada com sucesso");
    router.push("/borders")

    }catch (err) {
      console.log(err);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mb-4">
        <label
          htmlFor="name"
          className="mb-1 text-gray-700 font-medium text-sm"
        >
          Nome da borda
        </label>
        <input
          id="name"
          type="text"
          placeholder="Digite o nome da borda"
          {...register("name")}
          className="border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
        />
        <span className="text-red-500 text-sm font-bold">{errors.name?.message}</span>
      </div>
      <div className="flex flex-col mb-4">
        <label
          htmlFor="name"
          className="mb-1 text-gray-700 font-medium text-sm"
        >
          Preço
        </label>
        <input
          id="price"
          type="text"
          placeholder="Digite o preço da borda"
          {...register("price")}
          className="border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
        />
        <span className="text-red-500 text-sm font-bold">{errors.price?.message}</span>
      </div>
            <button className="bg-red-600 text-white rounded-lg py-2 px-4 hover:bg-red-700 transition">
        Criar borda
      </button>
    </form>
  );
}
