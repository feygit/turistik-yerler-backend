const express = require('express');
const ApiHata = require('../ApiHata');
const { ilSicakligiGetir } = require('../util/weatherapi');
// const girisYapmaKontrolu = require('../middlewares/girisYapma.middleware');
// const yoneticiMiKontrolu = require('../middlewares/yoneticiMi.middleware');

const router = express.Router();

router.get('/test', async (req, res) => {
  res.json({test: "test tamam"});
});

router.get('/', async (req, res) => {
  const {
    il
  } = req.query;
  
  const data = await ilSicakligiGetir(il);
  res.json({data});
});

module.exports = router;

/*
  ad               String          @db.VarChar(512)
  adres_id         Int             @unique
  sehir_id         Int
  aciklama         String
  resim            String          @default("") @db.VarChar(1024)
  tip              Int             @default(0) // 0: türistik yer, 1: hizmet veren yer
*/

// router.post('/', async (req, res, next) => {
//   try {
//     // bilgileri getir
//     let {ad, sehir_id, aciklama, tip} = req.body;
    
//     // kontrol et
//     adSoyadKontorl(ad);
//     adSoyadKontorl(soyad);
//     epostaKontrol(eposta);
//     sifreKontrol(sifre);
    
//     // temizle
//     [ad, soyad, eposta, sifre] = [
//       adSoyadTemizle(ad),
//       adSoyadTemizle(soyad),
//       epostaTemizle(eposta),
//       sifreTemizle(sifre),
//     ];

//     // sifre hashlama
//     const hashlanmisSifre = sifreyiHashla(sifre);

//     // veritabanında kaydet
//     const kullanici = await kullaniciOlustur({ad, soyad, eposta, hashlanmisSifre});
    
//     // yanit hazirla
//     kullanici.sifre = undefined;
    
//     // yanit ver
//     res.json({
//       hata: false,
//       data: kullanici,
//     });
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });
