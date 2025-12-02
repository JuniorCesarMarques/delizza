"use client";

import { useCart } from "@/context/cart/cartContext";
import { getPizzaPrice, getTotalPrice } from "@/utils/itemHooks";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { items } = useCart();

  const mpItems = items.map((i) => ({
    id: i.id,
    title: i.name,
    quantity: i.quantity,
    unit_price: Number(i.price),
  }));

  const thereIsNoPizza = !items.some(i => i.type === "pizza");
  const thereIsBorder = items.some(i => i.type === "border");
  const thereIsAdditional = items.some(i => i.type === "additional");

  const additionalWithoutPizza = thereIsNoPizza ? thereIsBorder || thereIsAdditional : false;


  const handleConfirm = async () => {
    if (additionalWithoutPizza) {
      toast.error("Você não pode comprar adicionais ou borda sem uma pizza.");
      return;
    } else {
      toast.success("Compra efeutada com sucesso");
    }

    // try {

    //   const res = await fetch("/api/orders", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       mpItems,
    //       total: totalPrice,
    //     }),
    //   });

    //   const data = await res.json();

    //   if (!res.ok) {
    //     console.error("ERRO AO CRIAR PEDIDO", data);
    //     return;
    //   }

    // } catch (err) {
    //   console.error("ERRO", err);
    // }
  };

  console.log(items, "ITEMS");
  const border = items.find((i) => i.type === "border");
  const pizza = items.filter((i) => i.type === "pizza");
  const additionals = items
    .filter((i) => i.type === "additional")
    .map((a) => {
      return {
        ...a,
        price: a.price.toFixed(2).toString().replace(".", ","),
      };
    });
  const drinks = items
    .filter((i) => i.type === "drink")
    .map((d) => {
      return {
        ...d,
        price: d.price.toFixed(2).toString().replace(".", ","),
      };
    });
  const pizzaPrice = getPizzaPrice(items);
  const totalPrice = getTotalPrice(items);
  const formatedBorderPrice = border?.price
    .toFixed(2)
    .toString()
    .replace(".", ",");

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Resumo do Pedido</h1>

      <div className="p-3 border rounded flex flex-col gap-3">
        {pizza.length > 1 ? (
          <div className="fle flex-col items-baseline">
            <div className="flex items-center gap-2 justify-between">
              {pizza.map((p, i) => (
                <span key={i}>Meia {p.name}</span>
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
                <span>{p.name}</span>
                <span className="text-green-600 font-bold whitespace-nowrap">
                  R$ {p.price}
                </span>
              </div>
            ))}
          </>
        )}
        {border && (
          <div className="flex items-center justify-between">
            <span>{border.name}</span>
            <span className="text-green-600 font-bold whitespace-nowrap">
              R$ {formatedBorderPrice}
            </span>
          </div>
        )}
        <>
          {additionals.map((a) => (
            <div key={a.id} className="flex justify-between">
              <span>{a.name}</span>
              <span className="text-green-600 font-bold whitespace-nowrap">
                R$ {a.price}
              </span>
            </div>
          ))}
        </>
        <>
          {drinks.map((d) => (
            <div key={d.id} className="flex justify-between">
              <span>{d.name}</span>
              <span className="text-green-600 font-bold whitespace-nowrap">
                R$ {d.price}
              </span>
            </div>
          ))}
        </>
      </div>
      <div className="text-xl font-bold mt-8 text-right whitespace-nowrap">
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
