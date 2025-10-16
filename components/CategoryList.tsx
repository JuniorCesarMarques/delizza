import { CategoryType } from "@/lib/types";
import CategoryCard from "./CateoryCard";

type CategoryTypeProps = {
  categories: CategoryType[]
}

export default async function CategoryList({categories}: CategoryTypeProps) {

  console.log(categories)

  return (
    <div className="flex gap-2">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
