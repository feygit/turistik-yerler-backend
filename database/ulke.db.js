const { PrismaClient } = require('@prisma/client');
const ApiHata = require('../ApiHata');
const prisma = new PrismaClient()

/*
  id       Int     @id @unique @default(autoincrement())
  ad       String  @db.VarChar(128)
  resim    String  @default("") @db.VarChar(1024)
  sehirler Sehir[]
*/

async function idIleUlkeGetir(id) {
  try {
    const ulke = await prisma.ulke.findUnique({
      where: {
        id,
      },
    });
    return ulke;
  } catch (error) {
    console.log(error);
    throw new ApiHata('ulke getirirken veritabanı hatası oluştu. yeniden deneyin.');
  }
}

async function tumUlkeleriGetir() {
  try {
    const ulke = await prisma.ulke.findMany();
    return ulke;
  } catch (error) {
    console.log(error);
    throw new ApiHata('ulke getirirken veritabanı hatası oluştu. yeniden deneyin.');
  }
}

async function ulkeOlustur({ad, resim}) {
  try {
    const ulke = await prisma.ulke.create({
      data: {
        ad,
        resim,
      },
    });
    return ulke;
  } catch (error) {
    console.log(error);
    throw new ApiHata('ulke oluştururken veritabanı hatası oluştu. yeniden deneyin.');
  }
}

async function ulkeGuncelle(id, guncelBilgiler) {
  try {
    const ulke = await prisma.ulke.update({
      where: {
        id,
      },
      data: guncelBilgiler,
    });
    return ulke;
  } catch (error) {
    console.log(error);
    throw new ApiHata('ulke güncellerken veritabanı hatası oluştu. yeniden deneyin.');
  }
}

async function ulkeSil(id) {
  try {
    const ulke = await prisma.ulke.delete({
      where: {
        id,
      },
    });
    return ulke;
  } catch (error) {
    console.log(error);
    throw new ApiHata('ulke silerken veritabanı hatası oluştu. yeniden deneyin.');
  }
}

module.exports = {
  ulkeOlustur,
  ulkeGuncelle,
  ulkeSil,
  idIleUlkeGetir,
  tumUlkeleriGetir,
};