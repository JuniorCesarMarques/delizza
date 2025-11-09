"use client";

import { ProductType } from "@/lib/types";
import Image from "next/image";

import DropdownMenu from "./antd/DropdownMenu";

import Link from "next/link";
import toast from "react-hot-toast";

import { useModal } from "@/app/contexts/ModalContext";

import { useRouter } from "next/navigation";
import { MenuProps } from "antd";

type ProductProps = {
  product: ProductType;
};

export default function ProductCard({ product }: ProductProps) {
  const { setModalProps } = useModal();

  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const handleDelete = async () => {
    const res = await fetch(`${baseUrl}/api/product/${product.id}`, {
      method: "DELETE",
    });

    if (!res) {
      toast.error("Erro ao excluir produto.");
    }

    toast.success("Produto excluido com sucesso.");
    router.refresh();
  };


  const handleMenuClick: MenuProps["onClick"] = (e) => {
    e.domEvent.stopPropagation();
    if (e.key === "delete") {
      setModalProps({
        text: "Tem Certeza que deseja excluir?",
        callback: () => handleDelete(),
      });
      return;
    }

    if (e.key === "edit") {
    }
  };

  return (
    <div
        key={product.id}
        className="flex items-center relative justify-between border p-4 gap-2 max-w-150"
      >
    <Link href={`/product/${product.id}`}>
          <div>
            <p className="font-bold text-zinc-600">{product.name}</p>
            <p className="text-zinc-600">{product.description}</p>
            <p className="font-bold text-zinc-800">R${product.price}</p>
          </div>
          <Image
            src={product.imageUrl || "/sem-foto.png"}
            width={100}
            height={100}
            alt=""
          />
      </Link>
          <DropdownMenu
            handleClick={handleMenuClick}
            items={[
              { label: "Editar", key: "edit" },
              { label: "Excluir", key: "delete" },
            ]}
          />
      </div>
  );
}
