import { CiHome } from "react-icons/ci";
import { LuNotebookPen } from "react-icons/lu";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function Navbar(){
    return (
        <nav className="fixed bottom-0 w-screen">
            <ul className="flex items-center justify-between px-10 bg-zinc-200 py-3">
                <li className="flex flex-col items-center">
                    <span><CiHome /></span>
                    <span>Início</span>
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