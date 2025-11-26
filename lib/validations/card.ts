import { z } from "zod";

export const cardSchema = z.object({
  cardNumber: z.string().min(13, "Número inválido"),
  cardHolderName: z.string().min(3, "Nome obrigatório"),
  expirationMonth: z.string().min(1, "Mês").max(2, "2 dígitos"),
  expirationYear: z.string().min(2, "Ano").max(4),
  securityCode: z.string().min(3, "CVV inválido").max(4),
  doc: z.string().min(11, "CPF inválido").max(11),
  installments: z.coerce.number().min(1),
});

export type CardSchema = z.infer<typeof cardSchema>;
