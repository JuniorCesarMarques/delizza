import { CategoryType } from "@/lib/types"
import Product from "./Product";

type CategoryProps = {
    category: CategoryType;
}


export default function Category({category}: CategoryProps) {
    return (
        <div key={category.id}>
          <p className="font-bold sticky top-0 text-zinc-800">{category.name}</p>

          <div className="flex items-center gap-4 flex-wrap">
            {category.products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
    )
}