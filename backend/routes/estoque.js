const express = require('express');
const router = express.Router();
const Estoque = require('../models/estoque');
const auth = require('../authenticate');

router.use(auth);

router.get('/', async (req, res) => {
  const estoque = await Estoque.find({ userId: req.user.id });
  res.json(estoque);
});

router.post('/', async (req, res) => {
  const item = new Estoque({ ...req.body, userId: req.user.id });
  await item.save();
  res.status(201).json(item);
});

router.put('/:id', async (req, res) => {
  const item = await Estoque.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  await Estoque.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ msg: 'Ingrediente removido do estoque' });
});

module.exports = router;