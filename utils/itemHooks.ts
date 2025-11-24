import { CartItem } from "@/context/cart/cart.types";

export function getPizzaPrice(items: CartItem[]) {
    const pizzas = items.filter(p => p.type === "pizza");
    const totalPrice = pizzas.reduce((acc, p) => acc + p.price, 0);
    const toFixedTwoPrice = totalPrice.toFixed(2);
    const formatedPrice = toFixedTwoPrice.replace(".", ",")

    return formatedPrice;

};



export function getTotalPrice(items: CartItem[]) {
    const totalPrice = items.reduce((acc, i) => i.price + acc, 0);
    const toFixedTwoPrice = totalPrice.toFixed(2);
    const formatedPrice = toFixedTwoPrice.replace(".", ",");

    return formatedPrice;
}