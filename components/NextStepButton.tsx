"use client";

import { useCart } from "@/context/cart/cartContext";
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function NextStepButton({callback}: {callback: () => void}) {
  const { total } = useCart();

  const formatedPrice = total.toFixed(2).toString().replace(".", ",");


  return (
    <div className="flex justify-center">
      <button onClick={() => callback()} className="cursor-pointer flex justify-between bg-blue-500 p-5 fixed bottom-10 text-white w-full">
            <span className="font-bold">R$ {formatedPrice}</span>
            <span className="font-bold">Avançar</span>
            <FaArrowAltCircleRight size={30} />
      </button>
    </div>
  );
}
