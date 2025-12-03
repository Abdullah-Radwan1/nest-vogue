/*
  Warnings:

  - The values [PERFUMES,SNEAKERS,ELECTRONICS,HOODIES] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('CHAIRS', 'CLOCKS', 'LAMPS', 'TABLES', 'ACCESSORIES');
ALTER TABLE "Product" ALTER COLUMN "Category" TYPE "Category_new" USING ("Category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;
