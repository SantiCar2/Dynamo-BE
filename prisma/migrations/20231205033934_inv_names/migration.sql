/*
  Warnings:

  - You are about to drop the column `entry` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - Added the required column `hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "entry";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password",
ADD COLUMN     "hash" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "inventoryNames" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventoryNames_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "inventoryNames_name_key" ON "inventoryNames"("name");

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_name_fkey" FOREIGN KEY ("name") REFERENCES "inventoryNames"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
