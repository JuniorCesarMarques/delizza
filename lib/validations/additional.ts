import { z } from "zod";

export const additionalSchema = z
  .object({
    name: z
      .string()
      .min(1, "O Nome é obrigatório")
      .max(100, "Nome muito longo"),
        price: z
  .string()
  .min(1, "Preço obrigatório")
  .transform((v) => v.replace(",", ".")) // troca vírgula por ponto

});

export type AdditionalSchema = z.infer<typeof additionalSchema>