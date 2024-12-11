const ApiHata = require("../ApiHata");

// yardimci fonksiyonlar
function metinMevcutMu(metin) {
  return !!metin;
}

function metinBosMu(metin) {
  return metin === '';
}

const reEposta = /[^\s@]+@[^\s@]+\.[^\s@]+/;
function metinEpostaMu(metin) {
  return reEposta.test(metin);
}

function metinSifreMi(metin) {
  const uzunluk = metin.length;
  return uzunluk >= 8 && uzunluk <= 32;
}

// kontrol fonksiyonlari
function adSoyadKontorl(adSoyad) {
  if (!metinMevcutMu(adSoyad)) {
    throw new ApiHata("ad veya soyad boş olamaz.");
  }

  adSoyad = adSoyad.trim();
  
  if (metinBosMu(adSoyad)) {
    throw new ApiHata("ad veya soyad boş olamaz.");
  };
}

function epostaKontrol(eposta) {
  if (!metinMevcutMu(eposta)) {
    throw new ApiHata("eposta boş olamaz.");
  }

  eposta = eposta.trim();

  if (metinBosMu(eposta)) {
    throw new ApiHata("eposta boş olamaz.");
  };

  if (!metinEpostaMu(eposta)) {
    throw new ApiHata("eposta yanlış formatta.");
  };

  return true;
}

function sifreKontrol(sifre) {
  if (!metinMevcutMu(sifre)) {
    throw new ApiHata("sifre boş olamaz.");
  }

  sifre = sifre.trim();

  if (metinBosMu(sifre)) {
    throw new ApiHata("sifre boş olamaz.");
  };

  if (!metinSifreMi(sifre)) {
    throw new ApiHata("sifre en az 8 ve en fazla 32 karakter olmalı.");
  };
}

function resimKontrol(resim) {
  if (!resim) {
    throw new ApiHata("resim boş olamaz.");
  }
}

module.exports = {
  adSoyadKontorl,
  epostaKontrol,
  sifreKontrol,
  resimKontrol,
};