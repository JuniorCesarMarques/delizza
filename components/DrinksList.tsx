"use client";

import { ProductType } from "@/lib/types";
import NextStepButton from "./NextStepButton";
import { useCart } from "@/context/cart/cartContext";
import { useRouter } from "next/navigation";
import DrinkCard from "./DrinkCard";

type ProductListType = {
  products: ProductType[];
};

export default function DrinksList({ products }: ProductListType) {
  const { items } = useCart();

  const router = useRouter();

  const handleNextStep = () => {
    router.push("/borders");
  };

  return (
    <div>
      <div className="fixed top-20 bg-white z-10 w-full p-2">
        <h1 className="text-3xl font-bold">Bebidas</h1>
        <div className="flex items-center gap-2">
          {items.map((item, index) => (
            <span key={index}>{item.name}</span>
          ))}
        </div>
      </div>
      {products.map((product) => (
        <DrinkCard key={product.id} drink={product} />
      ))}
      <NextStepButton callback={handleNextStep} />
    </div>
  );
}
