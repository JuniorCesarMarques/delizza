"use client";

import { ProductType } from "@/lib/types";
import Image from "next/image";

import DropdownMenu from "./antd/DropdownMenu";

import toast from "react-hot-toast";

import { useModal } from "@/app/contexts/ModalContext";
import { useCart } from "@/context/cart/cartContext";

import { useRouter } from "next/navigation";
import { MenuProps } from "antd";
import { useEffect, useState } from "react";
import { CartItem } from "@/context/cart/cart.types";

type ProductProps = {
  product: ProductType;

};

export default function ProductCard({ product }: ProductProps) {
  const { setModalProps } = useModal();

  const router = useRouter();
  const {
    addItem,
    increaseQty,
    removeItem,
    decreaseQty,
    totalQty,
    total,
    items,
  } = useCart();

  const [item, setItem] = useState<CartItem>();

  useEffect(() => {
    setItem(items.find((item) => item.id === product.id));
  }, [items]);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // console.log("ESTADO", items);

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
      router.push(`/product/edit/${product.id}`);
    }
  };

console.log("ITEMS", items)

  return (
    <div
      key={product.id}
      className={`${
        items.some((item) => item.id === product.id) && "border-blue-500"
      } flex items-center relative justify-between border p-4 gap-2 max-w-150`}
      onClick={() => {

        if(item?.id === product.id) {
          removeItem(product.id)
        } else {

          if(totalQty < 2) {
          addItem({
            id: product.id,
            name: product.name,
            price: Number(product.price) / 2,
            quantity: 1            
          })
        }
          
        }
        
}}


    >
      <div>
        <p className="font-bold text-zinc-600">{product.name}</p>
        <p className="text-zinc-600">{product.description}</p>
        <p className="font-bold text-zinc-800">
          R${product.price.replace(".", ",")}
        </p>
      </div>

      <div className="flex items-center">
        {item?.quantity ? (
          <div className="flex items-center gap-1">
            <span
              onClick={(e) => {
                e.stopPropagation();
                decreaseQty(product.id);
              }}
              className="text-4xl text-red-500"
            >
              -
            </span>
            <span className="text-2xl">{item.quantity}</span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                if (totalQty < 2) {
                  increaseQty(product.id);
                }
              }}
              className="text-4xl text-green-500"
            >
              +
            </span>
          </div>
        ) : (
          <span className="text-4xl text-green-500">+</span>
        )}
      </div>

      <Image
        src={product.imageUrl || "/sem-foto.png"}
        width={100}
        height={100}
        alt=""
      />
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
