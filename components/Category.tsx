import { CategoryType } from "@/lib/types"
import Product from "./Product";

type CategoryProps = {
    category: CategoryType;
}


export default function Category({category}: CategoryProps) {
    return (
        <div key={category.id}>
          <p className="font-bold sticky top-0 text-zinc-800 mb-3 bg-white">{category.name}</p>

          <div className="flex items-center gap-8 flex-wrap">
            {category.products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
    )
}