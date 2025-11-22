"use client"

import { CiHome } from "react-icons/ci";
import { LuNotebookPen } from "react-icons/lu";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { DropdownMenuNavigation } from "@/components/shacn/DropdownMenuNavigation";


export default function Navbar(){

    const menuContent = [
        {title: "Produto", options: [
        {title: "Novo", subOptions: [
            {option: "Produto", path: "/product/new"},
            {option: "Categoria", path: "/category/new"},
            {option: "Adicional", path: "/additional/new"},
            {option: "Borda", path: "/borders/new"}
        ]}

        ]}
    ]

    return (
        <nav className="fixed bottom-0 w-screen ">
            <ul className="flex items-center justify-between px-10 bg-zinc-200 py-3">
                <li className="flex flex-col items-center">
                    <DropdownMenuNavigation menuContent={menuContent}>
                        <CiHome />
                    </DropdownMenuNavigation>
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
        </nav>
    )
}