/*
  Warnings:

  - You are about to drop the `product_variants` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `CBM` to the `products` table without a default value. This is not possible if the table is not empty.
  - Made the column `SKU` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `precioDolar` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "inventories" DROP CONSTRAINT "inventories_productSKU_fkey";

-- DropForeignKey
ALTER TABLE "product_variants" DROP CONSTRAINT "product_variants_parentProductSKU_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_productSKU_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "CBM" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "SKU" SET NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "precioDolar" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "product_variants";

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_productSKU_fkey" FOREIGN KEY ("productSKU") REFERENCES "products"("SKU") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_productSKU_fkey" FOREIGN KEY ("productSKU") REFERENCES "products"("SKU") ON DELETE RESTRICT ON UPDATE CASCADE;
