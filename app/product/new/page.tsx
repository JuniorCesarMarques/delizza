import NewProductForm from "@/components/NewProductForm"

export default function NewProduct() {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-2">Novo Produto</h1>
            <NewProductForm />
        </div>
    )
}