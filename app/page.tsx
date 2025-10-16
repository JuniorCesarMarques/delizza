import CategoryList from "@/components/CategoryList";
import ProductsSkeleton from "@/components/ProductsSkeleton";
import { Suspense } from "react";

import { CategoryType } from "@/lib/types";

export default async function Home() {

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${baseUrl || "http://localhost:3000"}/api/category`);
    const categories: CategoryType[] = await res.json();


  return (
    <div>
      <Suspense fallback={<ProductsSkeleton />}>
        <CategoryList categories={categories} />
      </Suspense>
    </div>
  );
}
