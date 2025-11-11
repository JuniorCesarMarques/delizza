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
  imageUrl?: FileList; // aqui é FileList, não string
  category: string;
};


export type CategoryType = {
  id: string;
  name: string
  imageUrl: string;
  products: ProductType[];
}
