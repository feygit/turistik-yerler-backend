const ApiHata = require("../ApiHata");
const { epostaIleKullaniciGetir, idIleKullaniciGetir } = require("../database/kullanici.db");
const { jwtTokenDogrula } = require("../util/jwt");

async function girisYapmaKontrolu(req, res, next) {
  try {
    // hata mesaji
    const dogrulamaHataMesaji = 'yetkisiz erişim, kullanıcı doğrulaması başarısız oldu.';

    // token getirme
    const authToken = req.headers.authorization;
    if (!authToken || authToken.split(" ")[0] !== "Bearer") {
      throw new ApiHata(dogrulamaHataMesaji);
    }
    const jwtToken = authToken.split(" ")[1];
    
    // token dogrulama
    const jwtBilgileri = jwtTokenDogrula(jwtToken);
    if (!jwtBilgileri) throw new ApiHata(dogrulamaHataMesaji);
    
    // kullanici id elde etme
    const kullaniciId = jwtBilgileri.id;

    // kullanici getir
    const kullanici = await idIleKullaniciGetir(kullaniciId)
    if (!kullanici) throw new ApiHata(dogrulamaHataMesaji);

    // kullaniciyi istek objesine ekle
    req.kullanici = kullanici;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = girisYapmaKontrolu;