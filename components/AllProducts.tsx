"use client";

import { CategoryType } from "@/lib/types";
import { useEffect, useState } from "react";
import Category from "./Category";

export default function AllProducts() {

  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  console.log(categories);

  return (
    <div>
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
}
