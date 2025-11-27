"use client";

import DrinksList from "@/components/DrinksList";
import PizzasList from "@/components/PizzasList";
import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from "next/navigation";

export default function Product() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "";

  const fetcher = async () => {
    const res = await fetch(`/api/product?category=${category}`);

    return res.json();
  };

  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: fetcher,
  });

  if (category !== "Bebidas") {
    return <PizzasList products={data} category={category} />;
  }

  return <DrinksList />;
}
