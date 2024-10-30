require("dotenv").config();
const jwt = require('jsonwebtoken');
const ApiHata = require('../ApiHata');
const JWT_GIZLI_METIN = process.env.JWT_GIZLI_METIN;

function jwtTokenOlustur(id) {
  try {
    return jwt.sign({id}, JWT_GIZLI_METIN);
  } catch (error) {
    console.log(error);
    throw new ApiHata("JWT Tokeni oluştururken hata oluştu.");
  }
}

function jwtTokenDogrula(jwtToken) {
  try {
    return jwt.verify(jwtToken, JWT_GIZLI_METIN);
  } catch (error) {
    console.log(error);
    throw new ApiHata("JWT Tokeni doğrularken hata oluştu.");
  }
}

module.exports = {
  jwtTokenOlustur,
  jwtTokenDogrula,
};