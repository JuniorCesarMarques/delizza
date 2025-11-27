// Tipo dos dados que vêm do banco para edição, analisar se é necessaria uma modificação futura
export type EditProductType = {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  categoryId: string;
  additionals: { id: string; additionalId: string; productId: string }[];
  borders: { id: string; borderId: string; productId: string }[];
};

export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  categoryId: string;
  additionals: string[];
  borders: string[];
};

export type ProductForm = {
  name: string;
  description?: string;
  price: string;
  imageUrl?: FileList;
  category: string;
  additionals: string[];
};

export type CategoryType = {
  id: string;
  name: string;
  imageUrl: string;
  products: ProductType[];
};

export type Additional = {
  id: string;
  name: string;
  price: string;
};

export type Border = {
  id: string;
  name: string;
  price: string;
};

// types/mercadopago.d.ts
interface CardFormInstance {
  submit: () => void;
  getCardFormData: () => Record<string, unknown>; // evita any
  // adicione outros métodos que você realmente usa
}

interface MercadoPagoConstructor {
  new (publicKey: string, options?: { locale?: string }): MercadoPagoInstance;
  cardForm: (options: object) => CardFormInstance; // método estático
}

interface MercadoPagoInstance {
  // aqui você coloca métodos da instância de MercadoPago, se houver
}

declare global {
  interface Window {
    MercadoPago?: MercadoPagoConstructor;
    cardForm?: CardFormInstance; // guarda a instância criada, se quiser
  }
}





