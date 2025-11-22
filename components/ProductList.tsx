"use client";

import { ProductType } from "@/lib/types";
import ProductCard from "./ProductCard";
import NextStepButton from "./NextStepButton";
import { useCart } from "@/context/cart/cartContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type ProductListType = {
  products: ProductType[];
  category: string | string[] | undefined;
};

export default function ProductList({ products, category }: ProductListType) {
  const { items, totalQty } = useCart();

  const router = useRouter();

  const handleNextStep = () => {
    if(totalQty === 2) {
      router.push("/borders");
      return
    }

    toast.error("Ops! Você ainda precisa escolher a segunda metade.")
  }

  return (
    <div>
      <h1>{category}</h1>
      <p className="font-bold text-3xl">Escolha o seu sabor preferido</p>
      <div className="flex items-center gap-2">
        <p>Maximo 2 sabores | Selecionados: </p>{" "}
        <div className="flex items-center gap-2">
          {items.map((item, index) => (
            <span key={index}>{item.name}</span>
          ))}
        </div>
      </div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <NextStepButton callback={handleNextStep} />
    </div>
  );
}
