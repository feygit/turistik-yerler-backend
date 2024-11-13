const { PrismaClient } = require('@prisma/client');
const ApiHata = require('../ApiHata');
const prisma = new PrismaClient()

async function kullaniciOlustur({ad, soyad, eposta, sifre}) {
  try {
    const kullaniciSayisi = await prisma.kullanici.count();
    const kullanici = await prisma.kullanici.create({
      data: {
        ad,
        soyad,
        eposta,
        sifre,
        yoneticiMi: kullaniciSayisi < 1,
      },
    });
    return kullanici;
  } catch (error) {
    console.log(error);
    if (error.code === 'P2002') {
      throw new ApiHata(`eposta adresi sistemde mevcüt`);
    } else {
      throw new ApiHata('kullanici oluştururken veritabanı hatası oluştu. yeniden deneyin.');
    }
  }
}

async function idIleKullaniciGetir(id) {
  try {
    const kullanici = await prisma.kullanici.findUnique({
      where: {
        id,
      },
    });
    return kullanici;
  } catch (error) {
    console.log(error);
    throw new ApiHata('kullanici getirirken veritabanı hatası oluştu. yeniden deneyin.');
  }
}

async function epostaIleKullaniciGetir(eposta) {
  try {
    const kullanici = await prisma.kullanici.findUnique({
      where: {
        eposta,
      },
    });
    return kullanici;
  } catch (error) {
    console.log(error);
    throw new ApiHata('kullanici getirirken veritabanı hatası oluştu. yeniden deneyin.');
  }
}

async function kullaniciGuncelle(id, guncelBilgiler) {
  try {
    const kullanici = await prisma.kullanici.update({
      where: {
        id,
      },
      data: guncelBilgiler,
    });
    return kullanici;
  } catch (error) {
    console.log(error);
    throw new ApiHata('kullanici güncellerken veritabanı hatası oluştu. yeniden deneyin.');
  }
}

async function kullaniciSil(id) {
  try {
    const kullanici = await prisma.kullanici.delete({
      where: {
        id,
      },
    });
    return kullanici;
  } catch (error) {
    console.log(error);
    throw new ApiHata('kullanici silerken veritabanı hatası oluştu. yeniden deneyin.');
  }
}

module.exports = {
  kullaniciOlustur,
  idIleKullaniciGetir,
  epostaIleKullaniciGetir,
  kullaniciGuncelle,
  kullaniciSil,
};