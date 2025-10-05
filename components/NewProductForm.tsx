"use client";

import { useForm } from "react-hook-form";
import { ProductSchema, productSchema } from "@/lib/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { uploadImage } from "@/lib/uploadImage";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { ProductForm } from "@/lib/types";

type Categories = {
  id: string;
  name: string;
};

export default function NewProductForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductSchema>({ resolver: zodResolver(productSchema) });


  const [categories, setCategories] = useState<Categories[]>([]);

  const [preview, setPreview] = useState<string | null>(null);

  const router = useRouter();


  // Gera uma url para a imagem
  const file = watch("imageUrl")?.[0];
  if (file && !preview) {
    const objectURL = URL.createObjectURL(file);
    setPreview(objectURL);
  }

  const closePreview = () => {
    setPreview(null);
    setValue("imageUrl", "")
  }

console.log(errors)
  const onSubmit = async (data: ProductForm) => {
    console.log("ENTROU NO ONSUBMIT", data);
    try {

      const imageUrl = await uploadImage(data.imageUrl?.[0] as File);

    console.log("ANTES DO FETCH");

      const res = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...data, imageUrl: imageUrl || null}),
      });

      if (!res.ok) {
        toast.error("Ocorreu um erro!")
        throw new Error("Erro ao criar produto!");

      }

      const result = await res.json();
      console.log("Produto criado", result);

      toast.success("Produto criado com sucesso!")
      router.push("/")
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mb-4">
        <label
          htmlFor="name"
          className="mb-1 text-gray-700 font-medium text-sm"
        >
          Nome do Produto
        </label>
        <input
          id="name"
          type="text"
          placeholder="Digite o nome do produto"
          {...register("name")}
          className="border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
        />
        <span className="text-red-500">{errors.name?.message}</span>
      </div>

      <div className="flex flex-col mb-4">
        <label
          htmlFor="description"
          className="mb-1 text-gray-700 font-medium text-sm"
        >
          Descrição do Produto
        </label>
        <textarea
          id="description"
          placeholder="Digite a descrição do produto"
          {...register("description")}
          className="border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
        ></textarea>
      </div>

      <div>
        <input
          type="file"
          id="image"
          {...register("imageUrl")}
          className="hidden"
        />
        <label
          htmlFor="image"
          className="w-64 h-40 border-4 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-red-600 transition-colors"
        >
          <svg
            className="w-12 h-12 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4v8z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7h18M3 15h18"
            />
          </svg>
          <span className="text-gray-500 text-center">
            Clique para adicionar a imagem
          </span>
        </label>
        {preview && <div className="flex flex-col items-end">
          <span onClick={() => closePreview()}>X</span>
          <img src={preview as string} />
        </div>}
      </div>

      <div className="flex flex-col mb-4">
        <label
          htmlFor="price"
          className="mb-1 text-gray-700 font-medium text-sm"
        >
          Preço do Produto
        </label>
        <input
          id="price"
          type="number"
          placeholder="Digite o preço do produto"
          {...register("price", { valueAsNumber: true })}
          className="border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
        />
        <span className="text-red-500">{errors.price?.message}</span>
      </div>

      <div className="flex flex-col mb-4">
        <label
          htmlFor="category"
          className="mb-1 text-gray-700 font-medium text-sm"
        >
          Categoria do Produto
        </label>
        <select
          id="category"
          {...register("category")}
          defaultValue=""
          className="border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition"
        >
          <option value="" disabled>
            Selecione a categoria
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <span className="text-red-500">{errors.category?.message}</span>
      </div>

      <button className="bg-red-600 text-white rounded-lg py-2 px-4 hover:bg-red-700 transition">
        Criar Produto
      </button>
    </form>
  );
}
