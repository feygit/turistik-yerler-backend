const bcrypt = require('bcrypt');

function sifreyiHashla(sifre) {
  return bcrypt.hashSync(sifre, 12);
}

function sifreleriKarsilastir(duzmetinSifre, hashlanmisSifre) {
  return bcrypt.compareSync(duzmetinSifre, hashlanmisSifre);
}

module.exports = {
  sifreyiHashla,
  sifreleriKarsilastir,
}