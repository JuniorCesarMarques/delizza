"use client";

import CategoryForm from "./CategoryForm";
import { SubmitHandler } from "react-hook-form";
import { CategorySchema } from "@/lib/validations/category";
import toast from "react-hot-toast";
import { uploadImage } from "@/lib/uploadImage";
import { useRouter } from "next/navigation";

export default function NewCategoryClient() {

  const router = useRouter();

  const onSubmit: SubmitHandler<CategorySchema> = async (data) => {
    try {

      console.log(data)
      const imageUrl = await uploadImage(data.imageUrl as File);

      console.log("IMAGE URL", imageUrl);

      if (!imageUrl) {
        toast.error("Falha ao enviar a imagem. Tente novamente.");
        return;
      }


      const res = await fetch(`/api/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, imageUrl: imageUrl || null }),
      });

      if (!res.ok) {
        toast.error("Ocorreu um erro!");
        return;
      }

      toast.success("Categoria criada com sucesso!");
      router.push("/")
    } catch (err) {
        console.log(err)
    }
  };

  return <CategoryForm onSubmit={onSubmit} />;
}
