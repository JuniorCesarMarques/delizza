import EditCategoryClient from "@/components/EditCategoryClient";

export default async function EditCategory({ params }: { params: {id: string} }) {

const id = params.id;

    const res = await fetch(`http://localhost:3000/api/category/${id}`, {
        cache: "no-store"
    });

    if(!res.ok) {
        console.log("Erro ao buscar categoria.")
    }
    const data = await res.json();

  return <EditCategoryClient id={id} category={data} />;
}
