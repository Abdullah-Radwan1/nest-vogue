/*
  Warnings:

  - The values [BODY_SPRAY,AIR_FRESHENER] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('PERFUMES', 'SNEAKERS', 'ACCESSORIES', 'ELECTRONICS', 'HOODIES');
ALTER TABLE "Product" ALTER COLUMN "Category" TYPE "Category_new" USING ("Category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;
