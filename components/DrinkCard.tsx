"use client";

import { ProductType } from "@/lib/types";
import { useModal } from "@/app/contexts/ModalContext";
// import DropdownMenu from "./antd/DropdownMenu";
import { MenuProps } from "antd";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCart } from "@/context/cart/cartContext";
import Image from "next/image";

export default function DrinkCard({ drink }: { drink: ProductType }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setModalProps } = useModal();

  const { items, addItem, removeItem } = useCart();

  const drinks = items.filter((i) => i.type === "drink");

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  console.log(drink.price, "PREÇO");

  const formatedPrice = drink.price.includes(".")
    ? drink.price.replace(".", ",")
    : drink.price + ",00";

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${baseUrl}/api/product/${drink.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Erro ao excluir");
      }
    },

    onSuccess: () => {
      toast.success("Bebida excluído com sucesso!");

      queryClient.invalidateQueries({ queryKey: ["drink"] });
    },

    onError: () => {
      toast.error("Falha ao excluir bebida");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "delete") {
      setModalProps({
        text: "Tem certeza que deseja excluir?",
        callback: handleDelete,
      });
    }

    if (e.key === "edit") {
      router.push(`${baseUrl}/produc/${drink.id}`);
    }
  };

  return (
    <div
      onClick={() => {
        const current = drinks[0];

        removeItem(drink.id);

        if (!current || current.id !== drink.id) {
          addItem({
            id: drink.id,
            name: drink.name,
            price: Number(drink.price),
            quantity: 1,
            type: "drink",
          });
        }
      }}
      className={`${
        drinks.find((b) => b.id === drink.id) ? "border-blue-500" : ""
      } w-90 border rounded-xl p-3 shadow-sm bg-white relative flex items-center justify-between gap-3 hover:shadow-md transition`}
    >
      {/* <div className="absolute top-0 right-2">
        <DropdownMenu
          handleClick={handleMenuClick}
          items={[
            { label: "Editar", key: "edit" },
            { label: "Excluir", key: "delete" },
          ]}
        />
      </div> */}

      <span className="font-semibold text-gray-800 truncate">{drink.name}</span>
      <div className="flex items-center gap-2">
        <span className="font-bold text-green-600">R$ {formatedPrice}</span>
        <Image
          src={drink.imageUrl ? "/sem-foto.png" : "/sem-foto.png"}
          width={100}
          height={100}
          alt=""
        />
      </div>
    </div>
  );
}
