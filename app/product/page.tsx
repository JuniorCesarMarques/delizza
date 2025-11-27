"use client";

import { Suspense } from "react";
import ProductClient from "@/components/ProductClient";

export default function ProductPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ProductClient />
    </Suspense>
  );
}
