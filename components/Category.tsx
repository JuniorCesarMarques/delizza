import { CategoryType } from "@/lib/types"
import ProductCard from "./ProductCard";

type CategoryProps = {
    category: CategoryType;
}


export default function Category({category}: CategoryProps) {
    return (
        <div key={category.id}>
          <p className="font-bold sticky top-[73px] text-zinc-800 mb-3 bg-white">{category.name}</p>

          <div className="flex items-center gap-8 flex-wrap">
            {category.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
    )
}