"use client";

import { useQuery } from "@tanstack/react-query";
import CategoryCard from "./CateoryCard";
import { Skeleton } from "antd";
import { CategoryType } from "@/lib/types";

export default function CategoryList() {
  const fetchCategories = async (): Promise<CategoryType[]> => {
    const res = await fetch("/api/category");

    if (!res.ok) throw new Error("Erro ao buscar categorias");
    return res.json();
  };

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) return <Skeleton />;

  return (
    <div className="flex gap-2 p-5">
      {categories?.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
