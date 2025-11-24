"use client";

import DrinkCard from "@/components/DrinkCard";
import NextStepButton from "@/components/NextStepButton";
import { ProductType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Drinks() {
  const router = useRouter();
  const fetcher = async () => {
    const res = await fetch("/api/product?category=Bebidas");

    return res.json();
  };

  const { data: drinks } = useQuery<ProductType[]>({
    queryKey: ["drink"],
    queryFn: fetcher,
  });

  const handleNextStep = () => {
    router.push("/checkout");
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2">E aí, bora molhar o bico? 🥤</h1>
      {drinks?.map((d) => (
        <DrinkCard key={d.id} drink={d} />
      ))}
      <NextStepButton callback={handleNextStep} />
    </div>
  );
}
