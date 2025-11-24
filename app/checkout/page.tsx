"use client";

import { useCart } from "@/context/cart/cartContext";
import { getPizzaPrice, getTotalPrice } from "@/utils/itemHooks";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();

  const handleConfirm = () => {
    // FUTURO: enviar para API ou WhatsApp
    clearCart();
    router.push("/success");
  };

  console.log(items, "ITEMS")
  const border = items.find(i => i.type === "border");
  const pizza = items.filter(i => i.type === "pizza");
  const pizzaPrice = getPizzaPrice(items);



  const totalPrice = getTotalPrice(items);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Resumo do Pedido</h1>

      <div className="p-3 border rounded">
        {pizza.length > 1 ? (
          <div className="fle flex-col items-baseline">

            <div className="flex items-center gap-2">
            <p className="font-bold">Pizza:</p>
              {pizza.map((p, i) => (
                <span key={i}>Meia {p.name}</span>
              ))}
              <span className="font-bold text-green-700">R$ {pizzaPrice}</span>
            </div>


              {border && (
                  <div className="flex items-center gap-2">
                    <span className="font-bold">Borda:</span>
                    <span>{border.name}</span>
                    <span>{border.price}</span>
                  </div>
                )}
          </div>
        ) : (
          <span></span>
        )}
      </div>
      
 

      <div className="text-xl font-bold mt-8 text-right">
        Total: R$ {totalPrice}
      </div>

      <button
        onClick={handleConfirm}
        className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold"
      >
        Confirmar Pedido
      </button>
    </div>
  );
}
