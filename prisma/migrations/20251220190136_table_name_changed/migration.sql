/*
  Warnings:

  - You are about to drop the `SimpleOrder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."SimpleOrder";

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,
    "customer" TEXT,
    "items" JSONB NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
