"use client";

import { LuNotebookPen } from "react-icons/lu";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";

import { IoHomeOutline } from "react-icons/io5";
import { useCart } from "@/context/cart/cartContext";

export default function Navbar() {
  const { totalQty } = useCart();

  return (
    <nav className="fixed bottom-0 w-screen bg-zinc-200">
      <ul className="flex items-center justify-between px-10 py-3">
        <li className="cursor-pointer">
          <Link href="/">
            <IoHomeOutline size={20} />
          </Link>
        </li>
        <li className="flex flex-col items-center">
          <span>
            <LuNotebookPen size={20} />
          </span>
        </li>
        <Link href="/checkout">
        <li className="flex flex-col items-center cursor-pointer relative">
            <AiOutlineShoppingCart size={20} />
          <span className="flex justify-center items-center absolute bg-red-500 rounded-full text-sm text-white font-bold w-5 h-5 top-[-10px] right-[-10px]">
            {totalQty}
          </span>
        </li>
        </Link>
      </ul>
    </nav>
  );
}
