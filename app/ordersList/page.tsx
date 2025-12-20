"use client";

import { useQuery } from "@tanstack/react-query";

type OrdersType = {
    id: string;
  customer?: string;
  items: any[];
  total: number;
  status: string;
  createdAt: string;
}

export default function OrdersList() {
  const fetcher = async () => {
    const res = await fetch(`/api/order`, { cache: "no-store" });

    if (!res.ok) {
      console.log("Erro ao buscar adicionais", res);
    }

    return res.json();
  };

  const { data: orders } = useQuery<OrdersType[]>({
    queryKey: ["orders"],
    queryFn: fetcher,
  });


  return (
<div className="space-y-4">
  {orders?.map((order) => (
    <div
      key={order.id}
      className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
    >
      <p>
        <strong>Cliente:</strong> {order.customer ?? "Anônimo"}
      </p>
      <p>
        <strong>Total:</strong> R$ {Number(order.total).toFixed(2).toString().replace(".", ",")}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span
          className={
            order.status === "PENDING"
              ? "text-yellow-500 font-semibold"
              : order.status === "PAID"
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          {order.status}
        </span>
      </p>
      <p>
        <strong>Itens:</strong>
      </p>
      <ul className="pl-5 list-disc space-y-1">
        {order.items.map((item: any, i: number) => (
          <li key={i}>
            {item.name} {item.quantity ? `x${item.quantity}` : ""}
          </li>
        ))}
      </ul>
      <p className="text-sm text-gray-500 mt-2">
        Criado em: {new Date(order.createdAt).toLocaleString()}
      </p>
    </div>
  ))}
</div>
  );
}
