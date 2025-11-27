-- DropForeignKey
ALTER TABLE "public"."ProductAdditional" DROP CONSTRAINT "ProductAdditional_productId_fkey";

-- AddForeignKey
ALTER TABLE "public"."ProductAdditional" ADD CONSTRAINT "ProductAdditional_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
