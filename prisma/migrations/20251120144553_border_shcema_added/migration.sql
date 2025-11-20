-- CreateTable
CREATE TABLE "public"."ProductBorder" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "borderId" TEXT NOT NULL,

    CONSTRAINT "ProductBorder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductBorder_productId_borderId_key" ON "public"."ProductBorder"("productId", "borderId");

-- AddForeignKey
ALTER TABLE "public"."ProductBorder" ADD CONSTRAINT "ProductBorder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductBorder" ADD CONSTRAINT "ProductBorder_borderId_fkey" FOREIGN KEY ("borderId") REFERENCES "public"."Border"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
