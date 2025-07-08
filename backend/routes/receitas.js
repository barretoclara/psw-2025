const express = require('express');
const router = express.Router();
const Receita = require('../models/receitas');
const auth = require('../authenticate');

router.use(auth);

router.get('/', async (req, res) => {
  const receitas = await Receita.find({ userId: req.user.id });
  res.json(receitas);
});

router.post('/', async (req, res) => {
  try {
    const receita = new Receita({ ...req.body, userId: req.user.id });
    await receita.save();
    res.status(201).json(receita);
  } catch (err) {
    console.error("Erro ao salvar receita:", err);
    res.status(400).json({ msg: "Erro ao salvar receita", error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const receita = await Receita.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(receita);
  } catch (err) {
    console.error("Erro ao atualizar receita:", err);
    res.status(400).json({ msg: "Erro ao atualizar receita", error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Receita.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ msg: 'Receita deletada' });
  } catch (err) {
    console.error("Erro ao deletar receita:", err);
    res.status(400).json({ msg: "Erro ao deletar receita", error: err.message });
  }
});

module.exports = router;