import { IoMenu } from "react-icons/io5";

import Image from "next/image";
import { DropdownMenuNavigation } from "./shacn/DropdownMenuNavigation";

export default function Header() {

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
    <header className="fixed w-full z-10 bg-black px-10 py-3 flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Image
          className="rounded-full"
          src="/logo.jpeg"
          width={50}
          height={50}
          alt=""
        />
        <span className="text-zinc-100 font-bold">DELIZZA</span>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenuNavigation menuContent={menuContent}>
            <IoMenu size={30} color="white" />
        </DropdownMenuNavigation>
      </div>
    </header>
  );
}
