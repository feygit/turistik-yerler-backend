const { PrismaClient } = require('@prisma/client');
const ApiHata = require('../ApiHata');
const prisma = new PrismaClient()

/*
  id       Int    @id @unique @default(autoincrement())
  ad       String @db.VarChar(128)
  resim    String @default("") @db.VarChar(1024)
  ulke_id  Int
  ulke     Ulke   @relation(fields: [ulke_id], references: [id])
  yerler   Yer[]
*/

async function idIleSehirGetir(id) {
  try {
    const sehir = await prisma.sehir.findUnique({
      where: {
        id,
      },
    });
    return sehir;
  } catch (error) {
    console.log(error);
    throw new ApiHata('sehir getirirken veritabanı hatası oluştu. yeniden deneyin.');
  }
}

async function tumSehirleriGetir() {
  try {
    const sehir = await prisma.sehir.findMany();
    return sehir;
  } catch (error) {
    console.log(error);
    throw new ApiHata('sehir getirirken veritabanı hatası oluştu. yeniden deneyin.');
  }
}

async function ulkeSehirleriGetir(ulke_id) {
  try {
    const sehir = await prisma.sehir.findMany({
      where: {
        ulke_id,
      },
    });
    return sehir;
  } catch (error) {
    console.log(error);
    throw new ApiHata('sehir getirirken veritabanı hatası oluştu. yeniden deneyin.');
  }
}

async function sehirOlustur({ad, resim, ulke_id}) {
  try {
    const sehir = await prisma.sehir.create({
      data: {
        ad,
        resim,
        ulke_id,
      },
    });
    return sehir;
  } catch (error) {
    console.log(error);
    throw new ApiHata('sehir oluştururken veritabanı hatası oluştu. yeniden deneyin.');
  }
}

async function sehirGuncelle(id, guncelBilgiler) {
  try {
    const sehir = await prisma.sehir.update({
      where: {
        id,
      },
      data: guncelBilgiler,
    });
    return sehir;
  } catch (error) {
    console.log(error);
    throw new ApiHata('sehir güncellerken veritabanı hatası oluştu. yeniden deneyin.');
  }
}

async function sehirSil(id) {
  try {
    const sehir = await prisma.sehir.delete({
      where: {
        id,
      },
    });
    return sehir;
  } catch (error) {
    console.log(error);
    throw new ApiHata('sehir silerken veritabanı hatası oluştu. yeniden deneyin.');
  }
}

module.exports = {
  sehirOlustur,
  sehirGuncelle,
  sehirSil,
  idIleSehirGetir,
  tumSehirleriGetir,
  ulkeSehirleriGetir,
};