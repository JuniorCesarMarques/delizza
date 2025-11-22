"use client";

import { useQuery } from "@tanstack/react-query";
import AdditionalCard from "@/components/AdditionalCard";
import { Additional } from "@/lib/types";
import NextStepButton from "@/components/NextStepButton";

export default function AdditionalsPage() {
  const fetcher = async () => {
    const res = await fetch(`/api/additional`, { cache: "no-store" });

    if (!res.ok) {
      console.log("Erro ao buscar adicionais", res);
    }

    return res.json();
  };

  const { data: additionals, isLoading } = useQuery<Additional[]>({
    queryKey: ["additionals"],
    queryFn: fetcher,
  });

  if (isLoading) return <span>Carregando...</span>;

  console.log(additionals, "ADDITIONAIS")

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2">Bora turbinar sua pizza? 🍕</h1>
      {additionals?.map((additional) => (
        <AdditionalCard key={additional.id} additional={additional} />
      ))}
      <NextStepButton path="" />
    </div>
  );
}
