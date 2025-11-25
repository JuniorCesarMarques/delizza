"use client"

import CategoryForm from "./CategoryForm";
import { SubmitHandler } from "react-hook-form";
import { CategorySchema } from "@/lib/validations/category";
import toast from "react-hot-toast";
import { uploadImage } from "@/lib/uploadImage";
import { CategoryType } from "@/lib/types";
import { useRouter } from "next/navigation";


export default function EditCategoryClient({id, category}: {id: string, category: CategoryType}) {

  const router = useRouter();

      const onSubmit: SubmitHandler<CategorySchema> = async (data) => {
     try {
          const imageUrl = await uploadImage((data.imageUrl), id);
    
          const res = await fetch(`/api/category/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data, imageUrl: imageUrl || null }),
          });
    
          if (!res.ok) {
            toast.error("Ocorreu um erro!");
            return;
          }
    
          toast.success("Categoria editada com sucesso!");
          router.push("/");
        } catch (err) {
          console.log(err);
        }
  };

    return <CategoryForm onSubmit={onSubmit} category={category} />
}