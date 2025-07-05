const mongoose = require('mongoose');

const ListaMercadoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  itens: [
    {
      nome: String,
      quantidade: Number,
      unidade: String
    }
  ],
  receitasSelecionadas: [String],
  dataGeracao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ListaMercado', ListaMercadoSchema);