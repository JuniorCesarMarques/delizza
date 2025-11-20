-- AlterTable
ALTER TABLE "public"."OrderItem" ADD COLUMN     "borderId" TEXT;

-- CreateTable
CREATE TABLE "public"."Border" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Border_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_borderId_fkey" FOREIGN KEY ("borderId") REFERENCES "public"."Border"("id") ON DELETE SET NULL ON UPDATE CASCADE;
