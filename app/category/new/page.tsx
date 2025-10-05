"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  categoryName: string

}

export default function newCategory() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch("/api/category/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (err) {

    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center"
    >
      <h1 className="text-2xl font-bold mb-2">Nova Categoria</h1>

      <div className="flex flex-col items-center">
        <label
          htmlFor="categoryName"
          className="mb-1 text-gray-700 font-medium text-sm"
        >
          Nome da Categoria
        </label>
        <input
          {...register("categoryName")}
          type="text"
          placeholder="Digite o nome da Categoria"
          className="border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition mb-4 w-1/2"
        />
      </div>
      <button className="bg-red-600 text-white rounded-lg py-2 px-4 hover:bg-red-700 transition">
        Criar categoria
      </button>
    </form>
  );
}
