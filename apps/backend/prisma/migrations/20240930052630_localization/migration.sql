/*
  Warnings:

  - Added the required column `description_de` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_en` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_de` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_en` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "description_de" TEXT NOT NULL,
ADD COLUMN     "description_en" TEXT NOT NULL,
ADD COLUMN     "name_de" TEXT NOT NULL,
ADD COLUMN     "name_en" TEXT NOT NULL;
