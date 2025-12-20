/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItemAdditional` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_borderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItemAdditional" DROP CONSTRAINT "OrderItemAdditional_additionalId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OrderItemAdditional" DROP CONSTRAINT "OrderItemAdditional_orderItemId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropTable
DROP TABLE "public"."Order";

-- DropTable
DROP TABLE "public"."OrderItem";

-- DropTable
DROP TABLE "public"."OrderItemAdditional";

-- DropTable
DROP TABLE "public"."Payment";

-- DropEnum
DROP TYPE "public"."OrderStatus";

-- DropEnum
DROP TYPE "public"."PaymentProvider";

-- DropEnum
DROP TYPE "public"."PaymentStatus";

-- CreateTable
CREATE TABLE "public"."SimpleOrder" (
    "id" TEXT NOT NULL,
    "customer" TEXT,
    "items" JSONB NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SimpleOrder_pkey" PRIMARY KEY ("id")
);
