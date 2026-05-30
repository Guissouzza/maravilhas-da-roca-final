const express = require('express');
const cors = require('cors');
require('dotenv').config();

const favoritosRoutes = require('./src/routes/favoritos');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

app.use('/api/favoritos', favoritosRoutes);

app.use('/', (req, res) => {
  res.send('Servidor do Maravilhas da Roça rodando com sucesso');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando perfeitamente na porta ${PORT}`);
});