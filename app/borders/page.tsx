"use client"

import BorderCard from "@/components/BorderCard";
import NextStepButton from "@/components/NextStepButton";
import { useCart } from "@/context/cart/cartContext";
import { Border } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function BordersPage() {

    const { items } = useCart();

    const router = useRouter();

    const half1 = items[0]?.id;
    const half2 = items[1]?.id;

    const fetcher = async () => {
        const res = await fetch(`/api/border?half1=${half1}&half2=${half2}`);
        return res.json();

    }

    const {data: borders} = useQuery<Border[]>({
            queryKey: ["borders"],
            queryFn: fetcher
        })

    const handleNextStep = () => {

        router.push("/additional");
    }

    console.log("BORDERS", borders)

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center mb-4">Que tal uma borda recheada? 🍕</h1>
            {borders?.map((border) => (
                <BorderCard key={border.id} border={border} />
            ))}
            <NextStepButton callback={handleNextStep} />
        </div>
    )
}