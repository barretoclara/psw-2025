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
  const receita = new Receita({ ...req.body, userId: req.user.id });
  await receita.save();
  res.status(201).json(receita);
});

router.put('/:id', async (req, res) => {
  const receita = await Receita.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(receita);
});

router.delete('/:id', async (req, res) => {
  await Receita.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ msg: 'Receita deletada' });
});

module.exports = router;