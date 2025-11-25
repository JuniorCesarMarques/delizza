import EditCategoryClient from "@/components/EditCategoryClient";

export default async function EditCategory({ params }: { params: Promise<{id: string}> }) {

const { id } = await params;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${baseUrl}/api/category/${id}`, {
        cache: "no-store"
    });


    if(!res.ok) {
        console.log("Erro ao buscar categoria.");
        return
    }
    const data = await res.json();

  return <EditCategoryClient id={id} category={data} />;
}
