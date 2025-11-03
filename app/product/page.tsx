import ProductList from "@/components/ProductList";

export default async function Product({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

    const category = searchParams.category;


  const res = await fetch(`http://localhost:3000/api/product?category=${category}`);
  const data = await res.json();

  return <ProductList products={data} />;
}
