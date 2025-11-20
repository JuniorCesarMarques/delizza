import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),

  description: z.string().max(500, "Descrição muito longa").optional(),

  imageUrl: z.any().optional(),

  price: z.string().min(1, "O preço é obrigatório!"),

  category: z.string().min(1, "A categoria é obrigatória!"),
    additionals: z
    .union([z.string(), z.array(z.string())]),  // pode ser string ou array
    borders: z
    .union([z.string(), z.array(z.string())])  // pode ser string ou array
});


export type ProductSchema = z.infer<typeof productSchema>;
