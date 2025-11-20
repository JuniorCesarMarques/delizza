import EditAdditional from "@/components/EditAdditional";

export default async function EditAddtionalPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${baseUrl}/api/additional/${id}`);

  if(!res.ok) {
    console.log("Erro ao buscar adicional");
    return // Retornar uma pagina 
  }

  const data = await res.json();


  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-bold">Editar adicional</h1>
      <EditAdditional additional={data} />
    </div>
  );
}
