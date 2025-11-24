"use client";

import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import { cartInitialState, cartReducer } from "./cart.reducer";
import { CartItem } from "./cart.types";

interface CartContextProps {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
  total: number;
  totalQty: number;
}

const CartContext = createContext<CartContextProps | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)


  const addItem = (item: CartItem) =>
    dispatch({ type: "ADD_ITEM", payload: item });

  const removeItem = (id: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: { id } });

  const increaseQty = (id: string) =>
    dispatch({ type: "INCREASE_QTY", payload: { id } });

  const decreaseQty = (id: string) =>
    dispatch({ type: "DECREASE_QTY", payload: { id } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const total = state.items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalQty = state.items?.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(state));
  }, [state])

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if(stored) {
      dispatch({type: "SET_CART", payload: JSON.parse(stored)})
    }

  }, []);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        increaseQty,
        decreaseQty,
        clearCart,
        total,
        totalQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside <CartProvider>");
  return ctx;
};
