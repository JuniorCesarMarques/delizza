"use client"

import { CiHome } from "react-icons/ci";
import { LuNotebookPen } from "react-icons/lu";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";

export default function Navbar(){

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <nav className="fixed bottom-0 w-screen ">
            <ul className="flex items-center justify-between px-10 bg-zinc-200 py-3">
                <li onClick={() => setIsOpen(prev => !prev)} className="flex flex-col items-center">
                    <span><CiHome /></span>
                    <span>Inicio</span>
                </li>
                <li className="flex flex-col items-center">
                    <span><LuNotebookPen /></span>
                    <span>Pedidos</span>
                </li>
                <li className="flex flex-col items-center">
                    <span><AiOutlineShoppingCart /></span>
                    <span>Carrinho</span>
                </li>
            </ul>
            <ul className={`${!isOpen && "hidden"} absolute bottom-15 left-0 flex flex-col gap-2`}>
                <Link href="/category/new">
                    <li>Criar categoria</li>
                </Link>
                <Link href="/product/new">
                    <li>Cria produto</li>
                </Link>
            </ul>
        </nav>
    )
}