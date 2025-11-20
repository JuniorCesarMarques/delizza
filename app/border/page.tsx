"use client"

import BorderCard from "@/components/BorderCard";
import { Border } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function BordersPage() {

    const fetcher = async () => {
        const res = await fetch("api/border");
        return res.json();

    }

    const {data: borders} = useQuery<Border[]>({
            queryKey: ["borders"],
            queryFn: fetcher
        })

    return (
        <div className="flex justify-center">
            {borders?.map((border) => (
                <BorderCard key={border.id} border={border} />
            ))}
        </div>
    )
}