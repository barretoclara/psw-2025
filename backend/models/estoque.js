const mongoose = require('mongoose');

const estoqueSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  unidade: String,
  quantidade: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }
});

module.exports = mongoose.model('Estoque', EstoqueSchema);