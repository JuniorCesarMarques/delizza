import DrinksList from "@/components/DrinksList";
import ProductList from "@/components/ProductList";

export default async function Product({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await searchParams;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/product?category=${category}`);
  const data = await res.json();

  if (category !== "Bebidas") {
    return <ProductList products={data} category={category} />;
  }

  return <DrinksList />;
}
