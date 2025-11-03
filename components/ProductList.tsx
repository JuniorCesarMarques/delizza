import { ProductType } from "@/lib/types"
import ProductCard from "./ProductCard";

type ProductListType = {
    products: ProductType[];
}

export default function ProductList({ products }: ProductListType) {
    return(
        <div>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}