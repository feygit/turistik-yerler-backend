const express = require('express');
require('dotenv').config();

const ApiHata = require('./models/ApiHata');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({durum: 'Uygulama Çalışıyor!'});
})

// tüm hataları yakalanan api yolu
app.use((error, req, res, next) => {
  console.log(error);

  let httpCevap = {
    hata: true,
  };

  if (error instanceof ApiHata) {
    httpCevap.mesaj = error.hataMesaji;
  } else {
    httpCevap.mesaj = 'Sunucu tarafında bilinmeyen bir hata oluştu. yeniden deneyin.';
  }

  res.json(httpCevap);
})

app.listen(3000, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Uygulama 3000 nolu portunda çalışıyor ...');
  }
});