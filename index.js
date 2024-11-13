const express = require('express');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express"); 
const swaggerDocs = require("./docs/api.docs");
require('dotenv').config();
const ApiHata = require('./ApiHata');

const authRouter = require("./routes/auth.router");
const kullaniciRouter = require("./routes/kullanici.router");
const yerRouter = require("./routes/yer.router");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  customCss:'.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
  customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css",
}));

app.use("/auth", authRouter);
app.use("/kullanici", kullaniciRouter);
app.use("/yer", yerRouter);

app.get('/', (req, res) => {
  res.json({durum: 'Uygulama Çalışıyor!'});
});

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
});

app.listen(3000, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Uygulama 3000 nolu portunda çalışıyor ...');
  }
});