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

interface CardFormInstance {
  submit: () => void;
  getCardFormData: () => any; // ou mais específico depois
  // adicione outros métodos que você usa
}

interface MercadoPagoConstructor {
  new (publicKey: string, options?: { locale?: string }): any; // retorna instância do MercadoPago
  cardForm: (options: object) => CardFormInstance;
}

declare global {
  interface Window {
    MercadoPago?: MercadoPagoConstructor;
    cardForm?: CardFormInstance; // guarda a instância criada, se quiser
  }
}



