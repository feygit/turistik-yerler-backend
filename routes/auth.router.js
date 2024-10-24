const express = require('express');
const ApiHata = require('../ApiHata');
const { epostaIleKullaniciGetir } = require('../database/kullanici.db');
const { sifreleriKarsilastir } = require('../util/sifreHashlama');
const { jwtTokenOlustur } = require('../util/jwt');
const { epostaKontrol, sifreKontrol } = require('../util/kontrol');
const { epostaTemizle, sifreTemizle } = require('../util/temizle');

const router = express.Router();

router.post('/giris', async (req, res, next) => {
  try {
    // bilgileri getir
    let {eposta, sifre} = req.body;
    
    // kontrol et
    epostaKontrol(eposta);
    sifreKontrol(sifre);
    
    // temizle
    [eposta, sifre] = [
      epostaTemizle(eposta),
      sifreTemizle(sifre),
    ];

    // kullaniciyi getir
    const kullanici = await epostaIleKullaniciGetir(eposta);
    if (!kullanici) throw new ApiHata('eposta veya şifre hatalıdır');

    // sifreyi dogrula
    const sifreDogruMu = sifreleriKarsilastir(sifre, kullanici.sifre);
    if (!sifreDogruMu) throw new ApiHata('eposta veya şifre hatalıdır');
    
    // jwt token olustur
    const jwtToken = jwtTokenOlustur(kullanici.id);

    // yanit hazirla
    kullanici.sifre = undefined;
    kullanici.jwtToken = jwtToken;

    // yanit ver
    res.json({
      hata: false,
      data: kullanici,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;