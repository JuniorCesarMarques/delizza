import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),

  description: z.string().max(500, "Descrição muito longa").optional(),
  
  imageUrl: z
    .any()
    .optional(),

  price: z
    .number()
    .min(0.01, "O numero deve ser maior que 0")
    .positive("Preço deve ser maior que 0"),

  category: z.string().min(1, "A categoria é obrigatória!"),
});

export type ProductSchema = z.infer<typeof productSchema>;
