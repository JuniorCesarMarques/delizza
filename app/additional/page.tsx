"use client";

import { useQuery } from "@tanstack/react-query";
import AdditionalCard from "@/components/AdditionalCard";
import { Additional } from "@/lib/types";
import NextStepButton from "@/components/NextStepButton";
import { useRouter } from "next/navigation";

export default function AdditionalsPage() {
  const router = useRouter();

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

  const handleNextStep = () => {
    router.push("/drinks");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2">Bora turbinar sua pizza? 🍕</h1>
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
          {additionals?.map((additional) => (
            <AdditionalCard key={additional.id} additional={additional} />
          ))}
        </div>
      )}

      <NextStepButton callback={handleNextStep} />
    </div>
  );
}
