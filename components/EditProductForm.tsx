"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { ProductSchema, productSchema } from "@/lib/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { uploadImage } from "@/lib/uploadImage";

import { useRouter } from "next/navigation";

import { useParams } from "next/navigation";

import toast from "react-hot-toast";
import { Additional, Border, EditProductType } from "@/lib/types";

type Categories = {
  id: string;
  name: string;
};

export default function EditPRoductForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductSchema>({ resolver: zodResolver(productSchema) });

  const params = useParams();


  const [categories, setCategories] = useState<Categories[]>([]);
  const [product, setProduct] = useState<EditProductType>();
  const [borders, setBorders] = useState<Border[]>();
  const [additionals, setAdditionals] = useState<Additional[]>();

  const [preview, setPreview] = useState<string | null>(null);

  const router = useRouter();

  console.log("ADDITIONALS WATCH", watch("additionals"))
  console.log("BORDERS WATCH", watch("borders"))

  // Gera uma url para a imagem
  const file = watch("imageUrl")?.[0];
  if (file && !preview) {
    const objectURL = URL.createObjectURL(file);
    setPreview(objectURL);
  }

  const closePreview = () => {
    setPreview(null);
    setValue("imageUrl", "");
  };

  const onSubmit: SubmitHandler<ProductSchema> = async (data) => {
    try {
      const imageUrl = await uploadImage(data.imageUrl?.[0] as File);

      const res = await fetch(`/api/product/edit/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, imageUrl: imageUrl || null }),
      });

      if (!res.ok) {
        toast.error("Ocorreu um erro!");
        throw new Error("Erro ao editar produto!");
      }

      const result = await res.json();
      console.log("Produto editado", result);

      toast.success("Produto editado com sucesso!");
      router.push(`/product/${product?.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const [productRes, categoriesRes, additionalsRes, borderRes] =
        await Promise.all([
          fetch(`/api/product/${params.id}`),
          fetch("/api/category"),
          fetch("/api/additional"),
          fetch("/api/border"),
        ]);

      const product = await productRes.json();
      const categories = await categoriesRes.json();
      const additionals = await additionalsRes.json();
      const borders = await borderRes.json();

      setCategories(categories);
      setProduct(product);
      setAdditionals(additionals);
      setBorders(borders);
    };

    fetchData();
  }, []);

  // Preenche os campos do formulário
  useEffect(() => {
    if (product) {

      const formatedAdditionals = product.additionals.map(additional => {
        return additional.additionalId
      });

      const formatedBorders = product.borders.map(border => {
        return border.borderId
      });

      console.log("FORMATED VALUES", formatedAdditionals, formatedBorders);

      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("category", product.categoryId);
      setValue("additionals", formatedAdditionals);
      setValue("borders", formatedBorders);
      setPreview(product.imageUrl);
    }
  }, [product, setValue]);

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
        {preview && (
          <div className="flex flex-col items-end">
            <span onClick={() => closePreview()}>X</span>
            <img src={preview as string} />
          </div>
        )}
      </div>

      <div className="flex flex-col mb-4">
        <label
          htmlFor="price"
          className="mb-1 text-gray-700 font-medium text-sm"
        >
          Preço do Produto
        </label>
        <input
          step="any"
          id="price"
          type="text"
          placeholder="Digite o preço do produto"
          {...register("price")}
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

      {/* Adicionais */}
      <div className="flex flex-col gap-2">
        <p className="mb-1 text-gray-700 font-medium text-sm">Adicionais</p>
        {additionals?.map((a) => (
          <label key={a.id} className="flex items-center gap-2 mb-2">
            <input type="checkbox" value={a.id} {...register("additionals")} />
            {a.name}
          </label>
        ))}
      </div>

      {/* Bordas */}
      <div className="flex flex-col gap-2">
        <p className="mb-1 text-gray-700 font-medium text-sm">Bordas</p>
        {borders?.map((a) => (
          <label key={a.id} className="flex items-center gap-2 mb-2">
            <input type="checkbox" value={a.id} {...register("borders")} />
            {a.name}
          </label>
        ))}
      </div>

      <button
        type="submit"
        className="bg-red-600 text-white rounded-lg py-2 px-4 hover:bg-red-700 transition"
      >
        Editar Produto
      </button>
    </form>
  );
}
