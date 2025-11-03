-- AlterTable
ALTER TABLE "public"."Category" ADD COLUMN     "image" TEXT;

-- CreateTable
CREATE TABLE "public"."Additional" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Additional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductAdditional" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "additionalId" TEXT NOT NULL,

    CONSTRAINT "ProductAdditional_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductAdditional_productId_additionalId_key" ON "public"."ProductAdditional"("productId", "additionalId");

-- AddForeignKey
ALTER TABLE "public"."ProductAdditional" ADD CONSTRAINT "ProductAdditional_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductAdditional" ADD CONSTRAINT "ProductAdditional_additionalId_fkey" FOREIGN KEY ("additionalId") REFERENCES "public"."Additional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
