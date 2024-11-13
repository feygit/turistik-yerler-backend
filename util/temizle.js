function adSoyadTemizle(adSoyad) {
  return adSoyad.trim();
}

function epostaTemizle(eposta) {
  return eposta.trim().toLowerCase();
};

function sifreTemizle(sifre) {
  return sifre.trim();
}

module.exports = {
  adSoyadTemizle,
  epostaTemizle,
  sifreTemizle,
};