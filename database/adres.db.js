// enlem  Float
//   boylam Float
//   zoom   Int
//   adres  String

const { PrismaClient } = require('@prisma/client');
const ApiHata = require('../ApiHata');
const prisma = new PrismaClient();

async function adresOlustur(enlem, boylam, zoom, adres) {
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