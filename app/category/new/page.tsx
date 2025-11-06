import NewCategoryClient from "@/components/NewCategoryClient";


export default function NewCategory() {

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2">Nova Categoria</h1>
      <NewCategoryClient />
    </div>
  );
}
