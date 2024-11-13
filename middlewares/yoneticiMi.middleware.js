const ApiHata = require("../ApiHata");

async function yoneticiMiKontrolu(req, res, next) {
  try {
    const dogrulamaHataMesaji = 'yetkisiz erişim, kullanıcı doğrulaması başarısız oldu.';
    if (!req.kullanici.yoneticiMi) {
      throw new ApiHata(dogrulamaHataMesaji);
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = yoneticiMiKontrolu;