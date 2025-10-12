import { CategoryType } from "@/lib/types";
import Category from "./Category";

type CategoryTypeProps = {
  categories: CategoryType[]
}

export default async function ProductList({categories}: CategoryTypeProps) {

  return (
    <div>
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
}
