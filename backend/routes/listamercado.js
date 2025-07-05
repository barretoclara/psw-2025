const express = require('express');
const router = express.Router();
const Lista = require('../models/listamercado');
const Receita = require('../models/receitas');
const Estoque = require('../models/estoque');
const auth = require('../authenticate');

router.use(auth);

router.post('/gerar', async (req, res) => {
  const { receitasSelecionadas } = req.body;

  const receitas = await Receita.find({
    _id: { $in: receitasSelecionadas },
    userId: req.user.id
  });

  const estoque = await Estoque.find({ userId: req.user.id });

  let itensLista = [];

  receitas.forEach(receita => {
    receita.ingredientes.forEach(ingrediente => {
      const itemEstoque = estoque.find(i => i.nome === ingrediente.nome);
      const emEstoque = itemEstoque?.quantidade || 0;
      const falta = ingrediente.quantidade - emEstoque;

      if (falta > 0) {
        itensLista.push({
          nome: ingrediente.nome,
          quantidade: falta,
          unidade: ingrediente.unidade
        });
      }
    });
  });

  const lista = new Lista({
    userId: req.user.id,
    receitasSelecionadas,
    itens: itensLista
  });

  await lista.save();
  res.json(lista);
});

module.exports = router;