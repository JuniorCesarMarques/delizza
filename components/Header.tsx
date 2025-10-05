import { IoSearch } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";

import Image from "next/image";

export default function Header() {
    return (
        <header className="bg-primary px-10 py-3 flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <Image className="rounded-full" src="/logo.jpeg" width={50} height={50} alt="" />
                <span className="text-zinc-100 font-bold">DELIZZA</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="bg-red-200 p-1 rounded-full">
                    <IoSearch size={20} className="text-red-600" />
                </div>
                <div className="bg-red-200 p-1 rounded-full">
                    <IoShareSocialOutline size={20} className="text-red-600" />
                </div>
            </div>
        </header>
    )
}