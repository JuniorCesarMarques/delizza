"use client";

import { useCart } from "@/context/cart/cartContext";
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function NextStepButton({ path }: { path: string }) {
  const { total } = useCart();

  const formatedPrice = total.toFixed(2).toString().replace(".", ",")

  return (
    <div className="flex justify-center">
      <button className="cursor-pointer flex justify-between bg-blue-500 p-5 fixed bottom-20 text-white w-full">
        <Link href={path} className="w-full flex justify-between">
            <span className="font-bold">R$ {formatedPrice}</span>
            <span className="font-bold">Avançar</span>
            <FaArrowAltCircleRight size={30} />
        </Link>
      </button>
    </div>
  );
}
