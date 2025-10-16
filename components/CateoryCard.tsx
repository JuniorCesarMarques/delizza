import { CategoryType } from "@/lib/types"

type CategoryCardProps = {
    category: CategoryType
}

export default function CategoryCard({category}: CategoryCardProps) {

    return (
        <div>
            <h1>{category.name}</h1>
        </div>
    )
}