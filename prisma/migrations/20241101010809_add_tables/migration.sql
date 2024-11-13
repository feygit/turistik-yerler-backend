/*
  Warnings:

  - You are about to alter the column `ad` on the `Kullanici` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `soyad` on the `Kullanici` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `resim` on the `Kullanici` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1024)`.

*/
-- AlterTable
ALTER TABLE "Kullanici" ALTER COLUMN "ad" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "soyad" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "resim" SET DATA TYPE VARCHAR(1024);

-- CreateTable
CREATE TABLE "Yer" (
    "id" SERIAL NOT NULL,
    "ad" VARCHAR(512) NOT NULL,
    "adres_id" INTEGER NOT NULL,
    "sehir_id" INTEGER NOT NULL,
    "aciklama" TEXT NOT NULL,
    "resim" VARCHAR(1024) NOT NULL DEFAULT '',
    "tip" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Yer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Degerlendirme" (
    "id" SERIAL NOT NULL,
    "deger" INTEGER NOT NULL,
    "yorum" TEXT NOT NULL DEFAULT '',
    "kullanici_id" INTEGER NOT NULL,
    "yer_id" INTEGER NOT NULL,

    CONSTRAINT "Degerlendirme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ulke" (
    "id" SERIAL NOT NULL,
    "ad" VARCHAR(128) NOT NULL,
    "resim" VARCHAR(1024) NOT NULL DEFAULT '',
    "adres_id" INTEGER NOT NULL,

    CONSTRAINT "Ulke_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sehir" (
    "id" SERIAL NOT NULL,
    "ad" VARCHAR(128) NOT NULL,
    "resim" VARCHAR(1024) NOT NULL DEFAULT '',
    "ulke_id" INTEGER NOT NULL,
    "adres_id" INTEGER NOT NULL,

    CONSTRAINT "Sehir_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adres" (
    "id" SERIAL NOT NULL,
    "enlem" DOUBLE PRECISION NOT NULL,
    "boylam" DOUBLE PRECISION NOT NULL,
    "zoom" INTEGER NOT NULL,
    "adres" TEXT NOT NULL,

    CONSTRAINT "Adres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resim" (
    "id" SERIAL NOT NULL,
    "aciklama" TEXT NOT NULL,
    "url" VARCHAR(1024) NOT NULL,
    "yer_id" INTEGER NOT NULL,

    CONSTRAINT "Resim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Yer_id_key" ON "Yer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Yer_adres_id_key" ON "Yer"("adres_id");

-- CreateIndex
CREATE UNIQUE INDEX "Degerlendirme_id_key" ON "Degerlendirme"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ulke_id_key" ON "Ulke"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Ulke_adres_id_key" ON "Ulke"("adres_id");

-- CreateIndex
CREATE UNIQUE INDEX "Sehir_id_key" ON "Sehir"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Sehir_adres_id_key" ON "Sehir"("adres_id");

-- CreateIndex
CREATE UNIQUE INDEX "Adres_id_key" ON "Adres"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Resim_id_key" ON "Resim"("id");

-- AddForeignKey
ALTER TABLE "Yer" ADD CONSTRAINT "Yer_adres_id_fkey" FOREIGN KEY ("adres_id") REFERENCES "Adres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Yer" ADD CONSTRAINT "Yer_sehir_id_fkey" FOREIGN KEY ("sehir_id") REFERENCES "Sehir"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Degerlendirme" ADD CONSTRAINT "Degerlendirme_kullanici_id_fkey" FOREIGN KEY ("kullanici_id") REFERENCES "Kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Degerlendirme" ADD CONSTRAINT "Degerlendirme_yer_id_fkey" FOREIGN KEY ("yer_id") REFERENCES "Yer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ulke" ADD CONSTRAINT "Ulke_adres_id_fkey" FOREIGN KEY ("adres_id") REFERENCES "Adres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sehir" ADD CONSTRAINT "Sehir_ulke_id_fkey" FOREIGN KEY ("ulke_id") REFERENCES "Ulke"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sehir" ADD CONSTRAINT "Sehir_adres_id_fkey" FOREIGN KEY ("adres_id") REFERENCES "Adres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resim" ADD CONSTRAINT "Resim_yer_id_fkey" FOREIGN KEY ("yer_id") REFERENCES "Yer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
