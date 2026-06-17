import dotenv from 'dotenv';
dotenv.config();

// 2. Depois faz os outros imports normais
import express from 'express';
import cors from 'cors';
import productRoutes from './src/routes/productRoutes';
import userRoutes from './src/routes/userRoutes';
import favoritosRoutes from './src/routes/favoritosRoutes';
import cartRoutes from './src/routes/cartRoutes'

// 🔐 ADICIONADO (AUTH)
import authRoutes from './src/routes/authRoutes'
import authMiddleware from './src/middlewares/authMiddleware'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 🔓 PÚBLICO
app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/usuarios', userRoutes)

// 🔐 PROTEGIDO
app.use(authMiddleware)

app.use('/cart', cartRoutes)
app.use('/favoritos', favoritosRoutes)

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
});