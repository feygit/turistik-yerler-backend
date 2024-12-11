const express = require('express');
const ApiHata = require('../ApiHata');
const { adSoyadKontorl, epostaKontrol, sifreKontrol, resimKontrol } = require('../util/kontrol');
const { adSoyadTemizle, epostaTemizle, sifreTemizle } = require('../util/temizle');
const { sifreyiHashla } = require('../util/sifreHashlama');
const girisYapmaKontrolu = require('../middlewares/girisYapma.middleware');
const multer  = require('multer');
const axios = require('axios');
const { ulkeOlustur, idIleUlkeGetir, tumUlkeleriGetir, ulkeGuncelle, ulkeSil } = require('../database/ulke.db');
const uploadResim = require('../util/upload');
const { tumSehirleriGetir, idIleSehirGetir, ulkeSehirleriGetir, sehirOlustur, sehirGuncelle, sehirSil } = require('../database/sehir.db');
const { ilSicakligiGetir } = require('../util/weatherapi');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    // bilgileri getir
    const sehirler = await tumSehirleriGetir();
    
    // yanit ver
    res.json({
      hata: false,
      data: sehirler,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/ulke/:id', async (req, res, next) => {
  try {
    // bilgileri getir
    const ulkeId = parseInt(req.params.id);
    const sehirler = await ulkeSehirleriGetir(ulkeId);
    
    // yanit ver
    res.json({
      hata: false,
      data: sehirler,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    // bilgileri getir
    const sehirId = parseInt(req.params.id);

    // bilgileri getir
    const sehir = await idIleSehirGetir(sehirId);
    if (!sehir) throw new ApiHata("sehir bulunamadi");
    
    // weathe:
    const hava = await ilSicakligiGetir(sehir.ad);
    sehir.hava = hava;

    // yanit ver
    res.json({
      hata: false,
      data: sehir,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/', upload.single('resim'), async (req, res, next) => {
  try {
    // bilgileri getir
    let { ad, ulke_id } = req.body;
    let resim = req.file;

    // kontrol et
    adSoyadKontorl(ad);
    resimKontrol(resim);

    // temizle
    ad = adSoyadTemizle(ad);

    const ulke = await idIleUlkeGetir(parseInt(ulke_id));
    if (!ulke) {
      throw new ApiHata("ülke id bulunamadi");
    }

    const resimUrl = await uploadResim(resim);
    
    // veritabanında kaydet
    const sehir = await sehirOlustur({ad, resim: resimUrl, ulke_id: ulke.id});
    
    // yanit ver
    res.json({
      hata: false,
      data: sehir,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.patch('/:id', upload.single('resim'), async (req, res, next) => {
  try {
    // bilgileri getir
    const sehirId = parseInt(req.params.id);
    let { ad, ulke_id } = req.body;
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

    if (ulke_id) {
      const ulke = await idIleUlkeGetir(parseInt(ulke_id));
      if (!ulke) {
        throw new ApiHata("ülke id bulunamadi");
      }

      // guncel bilgilere ekle
      guncelBilgiler.ulke_id = ulke.id;
    };

    // ad varsa
    if (resim) {
      resimKontrol(resim);
      resimUrl = uploadResim(resim);
      // guncel bilgilere ekle
      guncelBilgiler.resim = resimUrl;
    };

    // veritabaninda guncelle
    const sehir = await sehirGuncelle(sehirId, guncelBilgiler);

    // yanit ver
    res.json({
      hata: false,
      data: sehir,
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    // bilgileri getir
    const sehirId = parseInt(req.params.id);

    // veritabanından sil
    const sehir = await sehirSil(sehirId);

    // yanit ver
    res.json({
      hata: false,
      data: sehir,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;