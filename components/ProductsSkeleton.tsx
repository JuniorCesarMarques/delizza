// components/ProductsSkeleton.tsx
export default function ProductsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse flex justify-between items-start border rounded p-4 space-x-4 bg-white"
        >
          {/* Conteúdo do texto */}
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-gray-300 rounded w-1/3" /> {/* Nome */}
            <div className="h-4 bg-gray-300 rounded w-full" /> {/* Descrição 1 */}
            <div className="h-4 bg-gray-300 rounded w-5/6" /> {/* Descrição 2 */}
            <div className="h-5 bg-gray-300 rounded w-1/4 mt-2" /> {/* Preço */}
          </div>

          {/* Imagem */}
          <div className="w-20 h-20 bg-gray-300 rounded flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}
