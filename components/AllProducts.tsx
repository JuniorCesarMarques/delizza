import { CategoryType } from "@/lib/types";
import Category from "./Category";

export default async function AllProducts() {

    const baseUrl = process.env.NEXT_PUBLIC_URL;

    const res = await fetch(`${baseUrl || "http://localhost:3000"}/api/category`);
    const categories: CategoryType[] = await res.json();


  return (
    <div>
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  );
}
