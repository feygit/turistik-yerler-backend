/*
  Warnings:

  - You are about to drop the column `adres_id` on the `Sehir` table. All the data in the column will be lost.
  - You are about to drop the column `adres_id` on the `Ulke` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sehir" DROP CONSTRAINT "Sehir_adres_id_fkey";

-- DropForeignKey
ALTER TABLE "Ulke" DROP CONSTRAINT "Ulke_adres_id_fkey";

-- DropIndex
DROP INDEX "Sehir_adres_id_key";

-- DropIndex
DROP INDEX "Ulke_adres_id_key";

-- AlterTable
ALTER TABLE "Sehir" DROP COLUMN "adres_id";

-- AlterTable
ALTER TABLE "Ulke" DROP COLUMN "adres_id";
