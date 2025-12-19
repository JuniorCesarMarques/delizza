export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between border p-4 gap-2 max-w-150 animate-pulse"
        >
          {/* Texto */}
          <div className="flex-1 space-y-2">
            <div className="h-4 w-40 bg-zinc-300 rounded" />
            <div className="h-3 w-56 bg-zinc-200 rounded" />
            <div className="h-4 w-20 bg-zinc-300 rounded" />
          </div>

          {/* Counter */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-zinc-300 rounded" />
            <div className="h-4 w-4 bg-zinc-200 rounded" />
            <div className="h-6 w-6 bg-zinc-300 rounded" />
          </div>

          {/* Imagem */}
          <div className="h-[70px] w-[70px] bg-zinc-300 rounded-md" />

          {/* Menu */}
          <div className="h-6 w-6 bg-zinc-300 rounded-full" />
        </div>
      ))}
    </div>
  );
}
