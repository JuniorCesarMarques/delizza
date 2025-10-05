export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
};

export type ProductForm = {
  name: string;
  description?: string;
  price: number;
  imageUrl?: FileList; // aqui é FileList, não string
  category: string;
};


export type CategoryType = {
  id: string;
  name: string
  products: ProductType[];
}