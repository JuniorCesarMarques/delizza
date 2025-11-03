"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema, categorySchema } from "@/lib/validations/category";
import { CategoryType } from "@/lib/types";

type CategoryFormProps = {
  onSubmit: SubmitHandler<CategorySchema>;
  category?: CategoryType;
};

export default function CategoryForm({
  onSubmit,
  category,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategorySchema>({
    defaultValues: {
      categoryName: category?.name,
      imageUrl: category?.image
    },
    resolver: zodResolver(categorySchema),
  });

  const [preview, setPreview] = useState<string | null>(category?.image as string);

    const file = watch("imageUrl")?.[0];

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if(e.target.files instanceof FileList) {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl)
      }

    }

    if (file instanceof File && !preview) {
    const objectUrl = URL.createObjectURL(file);
    setValue("imageUrl", objectUrl);
    setPreview(objectUrl);
  }

  const closePreview = () => {
    setPreview(null);
    setValue("imageUrl", null);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-2"
    >
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
        {errors.categoryName && (
          <span className="text-red-500">{errors.categoryName?.message}</span>
        )}
      </div>

      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          id="image"
          {...register("imageUrl")}
          className="hidden"
          onChange={(e) => onImageChange(e)}
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
          <div className="relative flex flex-col items-center">
            <span className="absolute right-2" onClick={() => closePreview()}>
              X
            </span>
            <img className="w-50" src={preview as string} />
          </div>
        )}
      </div>

      <button className="bg-red-600 text-white rounded-lg py-2 px-4 hover:bg-red-700 transition">
        Criar categoria
      </button>
    </form>
  );
}
