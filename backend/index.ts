import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path'; 
import productRoutes from './src/routes/productRoutes';
import userRoutes from './src/routes/userRoutes';
import favoritosRoutes from './src/routes/favoritosRoutes';
import cartRoutes from './src/routes/cartRoutes';
import orderRoutes from './src/routes/orderRoutes';
import authRoutes from './src/routes/authRoutes';
import authMiddleware from './src/middlewares/authMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

// 🌍 Ajuste dinâmico do CORS para produção e desenvolvimento
const allowedOrigins = ['http://localhost:5173', process.env.FRONTEND_URL].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado pelo CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🛑 Correção sutil no caminho estático para funcionar tanto em dev quanto buildado na pasta /dist
app.use('/uploads', express.static(path.join(__dirname, __dirname.includes('dist') ? '../public/uploads' : 'public/uploads')));

app.use('/auth', authRoutes);
app.use('/products', productRoutes); 
app.use('/usuarios', userRoutes);

app.use(authMiddleware);

app.use('/pedidos', orderRoutes);
app.use('/cart', cartRoutes);
app.use('/favoritos', favoritosRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando na porta ${PORT}`);
});