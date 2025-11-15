import Image from "next/image";


type ParamsProps = {
    params: Promise<{id: string}>
}

export default async function ProductPage({params}: ParamsProps) {

    const { id } = await params;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

    const res = await fetch(`${baseUrl}/api/product/${id}`)
    const product = await res.json();

    console.log("Product", product);


return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Imagem */}
        <div className="w-full h-80 relative rounded-2xl overflow-hidden bg-gray-100">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <span>Sem imagem disponível</span>
            </div>
          )}
        </div>

        {/* Informações */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          <p className="text-3xl font-semibold text-green-600 mb-6">
            R$ {product.price.replace(".", ",")}
          </p>

          <button className="bg-red-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-red-700 transition">
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
)
}