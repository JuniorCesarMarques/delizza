"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

type OrderItemType = {
  id: string;
  productName: string;
  quantity: number;
  type: string;
}

type OrdersType = {
  id: string;
  customer?: string;
  items: OrderItemType[];
  total: number;
  subtotal: string;
  deliveryFee: string;
  status: string;
  createdAt: string;
};

export default function OrdersList() {

  const { user } = useAuth();

  const router = useRouter();

  if(!user) {
    router.push("/");
    return
  }

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

  console.log(orders, "ORDERS");

  return (
    <>
      {orders?.map((order) => (
        <div className="max-w-xl mx-auto p-10 border rounded-lg space-y-4">
          {/* Cabeçalho */}
          <h2 className="text-lg font-semibold">Pedido</h2>
          <span className="text-gray-500">
            Status:

            {order.status === "PENDING"
              ? <span className="text-yellow-500"> Aguardando</span>
              : order.status === "CANCELED"
              ? <span className="text-red-500"> Cancelado</span>
              : <span className="text-green-500"> Pago</span>}
          </span>

          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="text-sm text-gray-500">Cliente: {order.customer}</p>
              <p className="text-xs text-gray-400">ID: {order.id}</p>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(order.createdAt).toLocaleString()}
            </span>
          </div>

          {/* Itens */}
          <div className="space-y-2">
            <h3 className="font-medium">Itens</h3>

            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border rounded p-2"
              >
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-xs text-gray-500">
                    Tipo: {item.type} • Quantidade: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Totais */}
          <div className="border-t pt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>R$ {Number(order.subtotal).toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Taxa de entrega</span>
              <span>R$ {Number(order.deliveryFee).toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>R$ {Number(order.total).toFixed(2)}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
