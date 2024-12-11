const axios = require('axios');


const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
const imgbbUploadUrl = "https://api.imgbb.com/1/upload";

async function uploadResim(resim) {
  const formData = new FormData();
  formData.append('key', IMGBB_API_KEY);
  formData.append('image', resim.buffer.toString("base64"));
  const sonuc = await axios.post(imgbbUploadUrl, formData);
  return sonuc.data.data.url;
}

module.exports = uploadResim;