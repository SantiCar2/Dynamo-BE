/*
  Warnings:

  - Added the required column `name` to the `inventories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inventories" ADD COLUMN     "name" TEXT NOT NULL;
