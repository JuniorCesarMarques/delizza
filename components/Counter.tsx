import { CartItem } from "@/context/cart/cart.types";
import { useCart } from "@/context/cart/cartContext";

type CounterProps = {
  increaseRule: boolean;
  item: CartItem | undefined
};

export default function Counter({
  increaseRule,
  item,
}: CounterProps) {
  const { decreaseQty, increaseQty } = useCart();

  return (
    <div className="flex items-center">
      {item?.quantity ? (
        <div className="flex items-center gap-1">
          <span
            onClick={(e) => {
              e.stopPropagation();
              decreaseQty((item as CartItem).id);
            }}
            className="text-4xl text-red-500"
          >
            -
          </span>
          <span className="text-2xl">{item?.quantity}</span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              if (increaseRule) {
                increaseQty((item as CartItem).id);
              }
            }}
            className="text-4xl text-green-500"
          >
            +
          </span>
        </div>
      ) : (
        <span className="text-4xl text-green-500">+</span>
      )}
    </div>
  );
}
