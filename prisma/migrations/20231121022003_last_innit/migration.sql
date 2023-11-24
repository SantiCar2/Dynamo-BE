/*
  Warnings:

  - A unique constraint covering the columns `[parentProductSKU]` on the table `product_variants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_variants_parentProductSKU_key" ON "product_variants"("parentProductSKU");
