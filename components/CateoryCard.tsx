"use client";

import { CategoryType } from "@/lib/types";
import Image from "next/image";
import DropdownMenu from "./antd/DropdownMenu";
import Link from "next/link";

type CategoryCardProps = {
  category: CategoryType;
};


export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="relative flex flex-col items-center gap-2">
      <div className="absolute top-0 right-0">
        <DropdownMenu
          id={category.id}
          items={[{ label: "Editar", key: "edit" }, { label: "Excluir", key: "delete" }]}
        />
      </div>
      <Link href={`/product?category=${category.name}`}>
        <Image
          src={category.image}
          width={250}
          height={150}
          alt="Picture of the author"
        />
      </Link>
      <p className="font-bold">{category.name}</p>
    </div>
  );
}
