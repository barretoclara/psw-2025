const mongoose = require('mongoose');

const EstoqueSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  unidade: String,
  quantidade: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" }
});

module.exports = mongoose.model('Estoque', EstoqueSchema);