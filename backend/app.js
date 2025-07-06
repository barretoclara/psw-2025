const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/receitas', require('./routes/receitas'));
app.use('/api/estoque', require('./routes/estoque'));
app.use('/api/categorias', require('./routes/categorias'));
app.use('/api/listamercado', require('./routes/listamercado'));

module.exports = app;