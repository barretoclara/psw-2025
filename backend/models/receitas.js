const mongoose = require('mongoose');

const ReceitaSchema = new mongoose.Schema({
  nome: String,
  tempo_preparo: Number,
  modo_preparo: String,
  categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' },
  ingredientes: [
    {
      nome: String,
      quantidade: Number,
      unidade: String
    }
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
});

module.exports = mongoose.model('Receita', ReceitaSchema);