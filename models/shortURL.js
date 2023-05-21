const mongoose = require("mongoose");

// Definir el esquema del modelo
const shortURLSchema = new mongoose.Schema({
  originalURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Crear el modelo a partir del esquema
const ShortURL = mongoose.model("ShortURL", shortURLSchema);

// Exportar el modelo
module.exports = ShortURL;
