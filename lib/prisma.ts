// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Evita múltiplas instâncias em desenvolvimento (Hot Reload Next.js)
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"], // opcional: mostra as queries no console
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
