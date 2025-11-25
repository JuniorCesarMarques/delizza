"use client";

import { ProductType } from "@/lib/types";
import NextStepButton from "./NextStepButton";
import { useCart } from "@/context/cart/cartContext";
import { useRouter } from "next/navigation";
import DrinkCard from "./DrinkCard";
import { useQuery } from "@tanstack/react-query";


export default function DrinksList() {
  const fetcher = async () => {
    const res = await fetch(`/api/product?category=Bebidas`);

    return res.json();
  };

  const { data: drinks } = useQuery<ProductType[]>({
    queryKey: ["products"],
    queryFn: fetcher,
  });

  const { items } = useCart();

  const router = useRouter();

  const handleNextStep = () => {
    router.push("/checkout");
  };

  return (
    <div>
      <div className="fixed top-20 bg-white z-10 w-full p-2">
        <h1 className="text-3xl font-bold">O que vai beber hoje? 🥤</h1>
      </div>
      {drinks?.map((product) => (
        <DrinkCard key={product.id} drink={product} />
      ))}
      <NextStepButton callback={handleNextStep} />
    </div>
  );
}
