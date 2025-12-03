/*
  Warnings:

  - Added the required column `Category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('PERFUMES', 'BODY_SPRAY', 'AIR_FRESHENER');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "Category" "Category" NOT NULL;
