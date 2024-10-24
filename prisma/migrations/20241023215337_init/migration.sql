-- CreateTable
CREATE TABLE "Kullanici" (
    "id" SERIAL NOT NULL,
    "eposta" VARCHAR(319) NOT NULL,
    "sifre" VARCHAR(512) NOT NULL,
    "ad" VARCHAR(255) NOT NULL,
    "soyad" VARCHAR(255) NOT NULL,
    "resim" TEXT NOT NULL DEFAULT '',
    "epostaOnayliMi" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Kullanici_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kullanici_id_key" ON "Kullanici"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Kullanici_eposta_key" ON "Kullanici"("eposta");
