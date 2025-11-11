"use client";

import { CategoryType } from "@/lib/types";
import Image from "next/image";
import DropdownMenu from "./antd/DropdownMenu";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useModal } from "@/app/contexts/ModalContext";
import { MenuProps } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CategoryCardProps = {
  category: CategoryType;
};

export default function CategoryCard({ category }: CategoryCardProps) {

  const router = useRouter();

  const { setModalProps } = useModal();

  const queryClient = useQueryClient();


  async function handleDeleteCategory(id: string) {
    const res = await fetch(`api/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      if (data?.error?.code === "P2003") {
        toast.error(
          "Não é possível excluir uma categoria que possua produtos vinculados."
        );
        return;
      }

      toast.error("Erro ao excluir categoria");
      return;
    }

    toast.success("Categoria excluída");
  }

const { mutate: deleteCategory } = useMutation({
  mutationFn: (id: string) => handleDeleteCategory(id),
  onSuccess: () => {

    queryClient.invalidateQueries({ queryKey: ["categories"] });
  },
});

  
    const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "delete") {
      setModalProps({
        callback: () => deleteCategory(category.id),
        text: "Tem certeza que deseja excluir?",
      });
    }

    if(e.key === "edit"){
      router.push(`/category/edit/${category.id}`)
    }
  };


  return (
    <div className="relative flex flex-col items-center gap-2">
      <div className="absolute top-0 right-0">
        <DropdownMenu
          handleClick={handleMenuClick}
          items={[
            { label: "Editar", key: "edit" },
            { label: "Excluir", key: "delete" },
          ]}
        />
      </div>
      <Link href={`/product?category=${category.name}`}>
        <div className="w-50 h-50 overflow-hidden">
          <Image
            src={category.imageUrl}
            width={200}
            height={200}
            alt="Picture of the author"
          />
        </div>
      </Link>
      <p className="font-bold">{category.name}</p>
    </div>
  );
}
