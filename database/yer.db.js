const { PrismaClient } = require('@prisma/client');
const ApiHata = require('../ApiHata');
const prisma = new PrismaClient()

/*
  ad               String          @db.VarChar(512)
  adres_id         Int             @unique
  sehir_id         Int
  aciklama         String
  resim            String          @default("") @db.VarChar(1024)
  tip              Int             @default(0) // 0: türistik yer, 1: hizmet veren yer
  degerlendirmeler Degerlendirme[]
  resimler         Resim[]
*/

async function adresIleYerOlustur() {
  try {
    const olusturulanAdres = await prisma.kullanici.create({
      data: {
        enlem,
        boylam,
        zoom,
        adres,
      },
    });
    return olusturulanAdres;
  } catch (error) {
    console.log(error);
    throw new ApiHata('kullanici oluştururken veritabanı hatası oluştu. yeniden deneyin.');
  }
}

module.exports = {
  adresOlustur,
};