"use client";

import BorderCard from "@/components/BorderCard";
import NextStepButton from "@/components/NextStepButton";
import { useCart } from "@/context/cart/cartContext";
import { Border } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BordersPage() {
  const { items } = useCart();

  const router = useRouter();

  const half1 = items[0]?.id;
  const half2 = items[1]?.id;

  const fetcher = async () => {
    const res = await fetch(`/api/border?half1=${half1}&half2=${half2}`);
    return res.json();
  };

  const { data: borders, isLoading } = useQuery<Border[]>({
    queryKey: ["borders"],
    queryFn: fetcher,
  });

  const handleNextStep = () => {
    router.push("/additional");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center mb-4">
        Que tal uma borda recheada? 🍕
      </h1>
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
          {borders?.map((border) => (
            <BorderCard key={border.id} border={border} />
          ))}
        </div>
      )}
      <NextStepButton callback={handleNextStep} />
    </div>
  );
}
