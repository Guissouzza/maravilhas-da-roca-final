import dotenv from 'dotenv';
dotenv.config();

// 2. Depois faz os outros imports normais
import express from 'express';
import cors from 'cors';
import productRoutes from './src/routes/productRoutes';
import userRoutes from './src/routes/userRoutes';
import favoritosRoutes from './src/routes/favoritosRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(productRoutes);
// Usando as rotas de usuário
app.use('/usuarios', userRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
});