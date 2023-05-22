const mongoose = require("mongoose");

// Definir el esquema del modelo
const shortURLSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Crear el modelo a partir del esquema
const ShortURL = mongoose.model("ShortURL", shortURLSchema);

// Exportar el modelo
module.exports = ShortURL;
