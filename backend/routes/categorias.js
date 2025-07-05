const express = require('express');
const router = express.Router();
const Categoria = require('../models/categorias');
const auth = require('../authenticate');

router.use(auth);

router.get('/', async (req, res) => {
  const categorias = await Categoria.find({ userId: req.user.id });
  res.json(categorias);
});

router.post('/', async (req, res) => {
  const categoria = new Categoria({ ...req.body, userId: req.user.id });
  await categoria.save();
  res.status(201).json(categoria);
});

router.put('/:id', async (req, res) => {
  const categoria = await Categoria.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(categoria);
});

router.delete('/:id', async (req, res) => {
  await Categoria.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ msg: 'Categoria deletada' });
});

module.exports = router;