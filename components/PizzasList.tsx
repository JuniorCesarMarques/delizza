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

export default function PizzasList({ products, category }: ProductListType) {
  const { items } = useCart();

  const pizzas = items.filter(item => item.type === "pizza");
  const qtyPizzas = pizzas.reduce((acc, p) => acc + p.quantity, 0);

  const router = useRouter();

  const handleNextStep = () => {
    if(qtyPizzas === 2) {
      router.push("/borders");
      return
    }

    toast.error("Selecione a segunda metade da pizza. 🍕")
  }

  return (
    <div>
      <div className="fixed top-15 bg-white z-10 w-full p-2">
        <h1>{category}</h1>
        <p className="font-bold text-2xl">Escolha o seu sabor preferido</p>
        <div className="flex items-center gap-2">
          <p className="font-bold">Sabores: </p>{" "}
          <div className="flex items-center gap-2">
            {items.map((item, index) => (
              <span className="p-1 bg-black text-white font-bold text-sm" key={index}>{item.name}</span>
            ))}
          </div>
        </div>
      </div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <NextStepButton callback={handleNextStep} />
    </div>
  );
}
