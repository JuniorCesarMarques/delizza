import { ProductType } from "@/lib/types";
import Image from "next/image";


type ProductProps = {
    product: ProductType
}

export default function Product({product}: ProductProps) {
  return (
    <div key={product.id} className="flex items-center border h-25 p-4 gap-2">
      <div>
        <p className="font-bold text-zinc-600">{product.name}</p>
        <p className="font-bold text-zinc-800">R$ {product.price},00</p>
      </div>
      <Image src={product.imageUrl || "/sem-foto.png"} width={100} height={100} alt="" />
    </div>
  );
}
