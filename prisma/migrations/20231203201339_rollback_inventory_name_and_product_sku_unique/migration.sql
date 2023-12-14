/*
  Warnings:

  - You are about to drop the column `name` on the `inventories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productSKU]` on the table `inventories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "inventories" DROP COLUMN "name";

-- CreateIndex
CREATE UNIQUE INDEX "inventories_productSKU_key" ON "inventories"("productSKU");
