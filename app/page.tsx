import AllProducts from "@/components/AllProducts";
import ProductsSkeleton from "@/components/ProductsSkeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<ProductsSkeleton />}>
        <AllProducts />
      </Suspense>
    </div>
  );
}
