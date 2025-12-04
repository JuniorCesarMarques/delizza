"use client";

import { LuNotebookPen } from "react-icons/lu";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";


import { IoHomeOutline } from "react-icons/io5";;

export default function Navbar() {
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
        <li className="flex flex-col items-center">
          <span>
            <AiOutlineShoppingCart size={20} />
          </span>
        </li>
      </ul>
    </nav>
  );
}
