const express = require('express');
const ApiHata = require('../ApiHata');
const { adSoyadKontorl, epostaKontrol, sifreKontrol, resimKontrol } = require('../util/kontrol');
const { adSoyadTemizle, epostaTemizle, sifreTemizle } = require('../util/temizle');
const { kullaniciOlustur, kullaniciSil, idIleKullaniciGetir, kullaniciGuncelle } = require('../database/kullanici.db');
const { sifreyiHashla } = require('../util/sifreHashlama');
const girisYapmaKontrolu = require('../middlewares/girisYapma.middleware');
const multer  = require('multer');
const axios = require('axios');
const { ulkeOlustur, idIleUlkeGetir, tumUlkeleriGetir, ulkeGuncelle, ulkeSil } = require('../database/ulke.db');
const uploadResim = require('../util/upload');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    // bilgileri getir
    const ulkeler = await tumUlkeleriGetir();
    
    // yanit ver
    res.json({
      hata: false,
      data: ulkeler,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    // bilgileri getir
    const ulkeId = parseInt(req.params.id);

    // bilgileri getir
    const ulke = await idIleUlkeGetir(ulkeId);
    if (!ulke) throw new ApiHata("ulke bulunamadi");
    
    // yanit ver
    res.json({
      hata: false,
      data: ulke,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/', upload.single('resim'), async (req, res, next) => {
  try {
    // bilgileri getir
    let { ad } = req.body;
    let resim = req.file;

    // kontrol et
    adSoyadKontorl(ad);
    resimKontrol(resim);

    // temizle
    ad = adSoyadTemizle(ad);
    const resimUrl = await uploadResim(resim);
    
    // veritabanında kaydet
    const ulke = await ulkeOlustur({ad, resim: resimUrl});
    
    // yanit ver
    res.json({
      hata: false,
      data: ulke,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.patch('/:id', upload.single('resim'), async (req, res, next) => {
  try {
    // bilgileri getir
    const ulkeId = parseInt(req.params.id);
    let { ad } = req.body;
    const resim = req.file;

    const guncelBilgiler = {};

    // ad varsa
    if (ad) {
      // kontrol et ve temizle
      adSoyadKontorl(ad);
      ad = adSoyadTemizle(ad);

      // guncel bilgilere ekle
      guncelBilgiler.ad = ad;
    };

    // ad varsa
    if (resim) {
      resimKontrol(resim);
      resimUrl = uploadResim(resim);
      // guncel bilgilere ekle
      guncelBilgiler.resim = resimUrl;
    };

    // veritabaninda guncelle
    const ulke = await ulkeGuncelle(ulkeId, guncelBilgiler);

    // yanit ver
    res.json({
      hata: false,
      data: ulke,
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    // bilgileri getir
    const ulkeId = parseInt(req.params.id);

    // veritabanından sil
    const ulke = await ulkeSil(ulkeId);

    // yanit ver
    res.json({
      hata: false,
      data: ulke,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;