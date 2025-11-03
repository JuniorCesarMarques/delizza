import ProductList from "@/components/ProductList";

export default async function Product({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

    const category = searchParams.category;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"


  const res = await fetch(`${baseUrl}/api/product?category=${category}`);
  const data = await res.json();

  return <ProductList products={data} />;
}
