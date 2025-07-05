const mongoose = require('mongoose');

const EstoqueSchema = new mongoose.Schema({
  nome: String,
  quantidade: Number,
  unidade: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
});

module.exports = mongoose.model('Estoque', EstoqueSchema);