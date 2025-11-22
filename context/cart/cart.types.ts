export interface CartItem {
  id: string; // id do produto OU id gerado pra combinações de pizza
  name: string;
  price: number;
  quantity: number;
  details?: any; // borda, adicionais, meia-meia etc.
}

export interface CartState {
  items: CartItem[];
}