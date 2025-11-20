export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  categoryId: string;
};

export type ProductForm = {
  name: string;
  description?: string;
  price: string;
  imageUrl?: FileList; 
  category: string;
  additionals: string[]
};


export type CategoryType = {
  id: string;
  name: string
  imageUrl: string;
  products: ProductType[];
}

export type Additional = {
  id: string,
  name: string,
  price: string
}

export type Border = {
  id: string,
  name: string,
  price: string
}
