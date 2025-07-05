const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const Usuario = require('../models/usuarios');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const novoUsuario = new Usuario({ nome, email, senha });
    await novoUsuario.save();

    const token = jwt.sign({ id: novoUsuario._id }, config.jwtSecret);
    res.json({ token, userId: novoUsuario._id, nome: novoUsuario.nome });
  } catch (err) {
    res.status(400).json({ msg: 'Erro ao registrar usuário', erro: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario || !(await usuario.compararSenha(senha))) {
      return res.status(401).json({ msg: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: usuario._id }, config.jwtSecret);
    res.json({ token, userId: usuario._id, nome: usuario.nome });
  } catch (err) {
    res.status(500).json({ msg: 'Erro interno', erro: err.message });
  }
});

module.exports = router;