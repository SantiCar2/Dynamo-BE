/*
  Warnings:

  - You are about to drop the column `parentProductSKU` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `productSKU` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_parentProductSKU_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "parentProductSKU",
ADD COLUMN     "productSKU" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_productSKU_fkey" FOREIGN KEY ("productSKU") REFERENCES "product_variants"("SKU") ON DELETE RESTRICT ON UPDATE CASCADE;
