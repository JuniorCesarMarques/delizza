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

  const { data: drinks, isLoading } = useQuery<ProductType[]>({
    queryKey: ["products"],
    queryFn: fetcher,
  });

  const router = useRouter();

  const handleNextStep = () => {
    router.push("/checkout");
  };

  return (
    <div>
      <div className=" bg-white z-10 w-full p-2">
        <h1 className="text-3xl font-bold">O que vai beber hoje? 🥤</h1>
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="flex gap-2">
            <div className="h-4 w-4 rounded-full bg-neutral-300"></div>
            <div className="h-4 w-4 rounded-full bg-neutral-300"></div>
            <div className="h-4 w-4 rounded-full bg-neutral-300"></div>
          </div>

          <div className="h-8 w-48 bg-neutral-300 rounded-full"></div>
          <div className="h-6 w-32 bg-neutral-300 rounded-md"></div>
        </div>
      ) : (
        <div>
          {drinks?.map((product) => (
            <DrinkCard key={product.id} drink={product} />
          ))}
        </div>
      )}
      <NextStepButton callback={handleNextStep} />
    </div>
  );
}
