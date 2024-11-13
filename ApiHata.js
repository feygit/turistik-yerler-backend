class ApiHata extends Error {
  constructor (mesaj) {
    super(mesaj)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor);
    this.hataMesaji = mesaj;
  }
}

module.exports = ApiHata;