require('dotenv').config();
const axios = require("axios");
const { sign } = require('jsonwebtoken');

const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const geocodingApiUrl = 'https://api.openweathermap.org/geo/1.0/direct';
const API_KEY = process.env.WEATHER_API_KEY;

async function ilKoordinatlariGetir(ilAdi) {
  try {
    const params = new URLSearchParams();
    params.append('q', ilAdi);
    params.append('appid', API_KEY);
    const sonuc = await axios(geocodingApiUrl, {params: params});
    return sonuc.data;
    
  } catch (error) {
    console.log(error);
  }
};

async function ilSicakligiGetir(ilAdi) {
  
  try {
    const koordiantlar = await ilKoordinatlariGetir(ilAdi);
    const { lat, lon } = koordiantlar[0];
    
    const params = new URLSearchParams();
    params.append('lat', lat);
    params.append('lon', lon);
    params.append('units', 'metric');
    params.append('lang', 'tr');
    params.append('appid', API_KEY);
    const sonuc = await axios(weatherApiUrl, {params: params});
    console.log(sonuc.data);
    const havaBilgileri = {
      sicaklik: sonuc.data.main.temp,
      gibiGorunuyor: sonuc.data.main.feels_like,
      basinc: sonuc.data.main.pressure,
      nem: sonuc.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${sonuc.data.weather[0].icon}@2x.png`,
      aciklama: sonuc.data.weather[0].description,
    };
    return havaBilgileri;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  ilKoordinatlariGetir,
  ilSicakligiGetir,
}