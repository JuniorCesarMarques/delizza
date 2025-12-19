import { z } from "zod";

export const gatewayInfoSchema = z.object({
  street: z.string().min(1, "A rua é obrigatória").max(100, "Nome muito longo"),
  number: z
    .string()
    .min(1, "O número é obrigatório")
    .max(10, "Número muito longo"),
  neighborhood: z
    .string()
    .min(1, "O bairro é obrigatório")
    .max(100, "Nome muito longo"),
});

export type GatewayInfoSchema = z.infer<typeof gatewayInfoSchema>;
