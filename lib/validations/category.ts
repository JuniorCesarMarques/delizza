import { z } from "zod";

export const categorySchema = z
  .object({
    categoryName: z
      .string()
      .min(1, "O Nome é obrigatório")
      .max(100, "Nome muito longo"),

    imageUrl: z.any().optional()
  })

export type CategorySchema = z.infer<typeof categorySchema>