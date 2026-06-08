import dotenv from 'dotenv';
dotenv.config();

// 2. Depois faz os outros imports normais
import express from 'express';
import cors from 'cors';
import productRoutes from './src/routes/productRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
});