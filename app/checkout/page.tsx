"use client";

import { useCart } from "@/context/cart/cartContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total } = useCart();

  const thereIsNoPizza = !items.some((i) => i.type === "pizza");
  const thereIsBorder = items.some((i) => i.type === "border");
  const thereIsAdditional = items.some((i) => i.type === "additional");

  const additionalWithoutPizza = thereIsNoPizza
    ? thereIsBorder || thereIsAdditional
    : false;

  const handleConfirm = async () => {
    const orderId = window.localStorage.getItem("orderId");


    if (additionalWithoutPizza) {
      toast.error("Você não pode comprar adicionais ou borda sem uma pizza.");
      return;
    }

    const res = await fetch(`api/check-order-id/${orderId}`);

    console.log(res, "RES");


    if(!orderId || !res.ok) {
      router.push("/get-info")
      return
    }

    router.push(`/gateway/${orderId}`);

  };

  const border = items.find((i) => i.type === "border");
  const pizza = items.filter((i) => i.type === "pizza");

  const pizzaPrice = pizza
    .reduce((acc, p) => p.price * p.quantity + acc, 0)
    .toFixed(2)
    .replace(".", ",");

  const additionals = items
    .filter((i) => i.type === "additional")
    .map((a) => {
      return {
        ...a,
        price: a.price.toFixed(2).toString().replace(".", ","),
      };
    });
  const drinks = items.filter((i) => i.type === "drink");

  const formatedBorderPrice = border?.price
    .toFixed(2)
    .toString()
    .replace(".", ",");

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Resumo do Pedido</h1>

      <div className="p-3 border rounded flex flex-col gap-3">
        {pizza.length > 1 ? (
          <div className="fle flex-col items-baseline">
            <div className="flex items-center gap-2 justify-between">
              {pizza.map((p, i) => (
                <span key={i}>Meia {p.name} (1)</span>
              ))}
              <span className="font-bold text-green-600 whitespace-nowrap">
                R$ {pizzaPrice}
              </span>
            </div>
          </div>
        ) : (
          <>
          {pizza.map((p) => (
              <div key={p.id} className="flex justify-between">
                <span>{p.name} (1)</span>
                <span className="text-green-600 font-bold whitespace-nowrap">
                  R$ {pizzaPrice}
                </span>
              </div>
            ))}
          </>
        )}

        {border && (
          <div className="flex items-center justify-between">
            <span>{border.name} (1)</span>
            <span className="text-green-600 font-bold whitespace-nowrap">
              R$ {formatedBorderPrice}
            </span>
          </div>
        )}
        <>
          {additionals.map((a) => (
            <div key={a.id} className="flex justify-between">
              <span>{a.name} (1)</span>
              <span className="text-green-600 font-bold whitespace-nowrap">
                R$ {a.price}
              </span>
            </div>
          ))}
        </>
        <>
          {drinks.map((d) => (
            <div key={d.id} className="flex justify-between">
              <span>
                {d.name} ({d.quantity})
              </span>
              <span className="text-green-600 font-bold whitespace-nowrap">
                R${" "}
                {(Number(d.quantity) * Number(d.price))
                  .toFixed(2)
                  .replace(".", ",")}
              </span>
            </div>
          ))}
        </>
      </div>
      <div className="text-xl font-bold mt-8 text-right whitespace-nowrap">
        Total: R$ {total.toFixed(2).replace(".", ",")}
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
