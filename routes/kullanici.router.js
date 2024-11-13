const express = require('express');
const ApiHata = require('../ApiHata');
const { adSoyadKontorl, epostaKontrol, sifreKontrol } = require('../util/kontrol');
const { adSoyadTemizle, epostaTemizle, sifreTemizle } = require('../util/temizle');
const { kullaniciOlustur, kullaniciSil, idIleKullaniciGetir, kullaniciGuncelle } = require('../database/kullanici.db');
const { sifreyiHashla } = require('../util/sifreHashlama');
const girisYapmaKontrolu = require('../middlewares/girisYapma.middleware');

const router = express.Router();

router.get('/', girisYapmaKontrolu, async (req, res, next) => {
  try {
    // bilgileri getir
    const kullanici = req.kullanici;

    // yanit hazirla
    kullanici.sifre = undefined;
    
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

router.get('/:id', async (req, res, next) => {
  try {
    // bilgileri getir
    const kullaniciId = parseInt(req.params.id);

    // bilgileri getir
    const kullanici = await idIleKullaniciGetir(kullaniciId);
    if (!kullanici) throw new ApiHata("kullanici bulunamadi");

    // yanit hazirla
    kullanici.sifre = undefined;
    kullanici.eposta = undefined;
    kullanici.epostaOnayliMi = undefined;
    
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

router.post('/', async (req, res, next) => {
  try {
    // bilgileri getir
    let {ad, soyad, eposta, sifre} = req.body;
    
    // kontrol et
    adSoyadKontorl(ad);
    adSoyadKontorl(soyad);
    epostaKontrol(eposta);
    sifreKontrol(sifre);
    
    // temizle
    [ad, soyad, eposta, sifre] = [
      adSoyadTemizle(ad),
      adSoyadTemizle(soyad),
      epostaTemizle(eposta),
      sifreTemizle(sifre),
    ];

    // sifre hashlama
    const hashlanmisSifre = sifreyiHashla(sifre);

    // veritabanında kaydet
    const kullanici = await kullaniciOlustur({ad, soyad, eposta, sifre: hashlanmisSifre});
    
    // yanit hazirla
    kullanici.sifre = undefined;
    
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

router.patch('/', girisYapmaKontrolu, async (req, res, next) => {
  try {
    // bilgileri getir
    const dogrulanmisKullanici = req.kullanici;
    let {ad, soyad, eposta, sifre} = req.body;
    
    const guncelBilgiler = {};

    // ad varsa
    if (ad) {
      // kontrol et ve temizle
      adSoyadKontorl(ad);
      ad = adSoyadTemizle(ad);

      // guncel bilgilere ekle
      guncelBilgiler.ad = ad;
    };

    // soyad varsa
    if (soyad) {
      // kontrol et ve temizle
      adSoyadKontorl(soyad);
      soyad = adSoyadTemizle(soyad);
      
      // guncel bilgilere ekle
      guncelBilgiler.soyad = soyad;
    };

    // eposta varsa
    if (eposta) {
      // kontrol et ve temizle
      epostaKontrol(eposta);
      eposta = epostaTemizle(eposta);

      // guncel bilgilere ekle
      guncelBilgiler.eposta = eposta;
      guncelBilgiler.epostaOnayliMi = false;
    };

    // sifre varsa
    if (sifre) {
      // kontrol et ve temizle
      sifreKontrol(sifre);
      sifre = sifreTemizle(sifre);

      // sifre hashlama
      const hashlanmisSifre = sifreyiHashla(sifre);

      // guncel bilgilere ekle
      guncelBilgiler.sifre = hashlanmisSifre;
    };

    // veritabaninda guncelle
    const kullanici = await kullaniciGuncelle(dogrulanmisKullanici.id, guncelBilgiler);

    // yanit hazirla
    kullanici.sifre = undefined;
    
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

router.delete('/', girisYapmaKontrolu, async (req, res, next) => {
  try {
    // bilgileri getir
    const dogrulanmisKullanici = req.kullanici;

    // veritabanından sil
    const kullanici = await kullaniciSil(dogrulanmisKullanici.id);
    
    // yanit hazirla
    kullanici.sifre = undefined;
    
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