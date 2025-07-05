const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  nome: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
});

module.exports = mongoose.model('Categoria', CategoriaSchema);