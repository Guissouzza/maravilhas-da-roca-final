import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'

// Routes
import productRoutes from './src/routes/productRoutes'
import userRoutes from './src/routes/userRoutes'
import favoritosRoutes from './src/routes/favoritosRoutes'
import cartRoutes from './src/routes/cartRoutes'
import authRoutes from './src/routes/authRoutes'

// Middlewares
import authMiddleware from './src/middlewares/authMiddleware'

const app = express()
const PORT = process.env.PORT || 3000

// 🔐 Middlewares globais
app.use(cors())
app.use(express.json())

/**
 * 🔓 ROTAS PÚBLICAS (sem login)
 */
app.use('/auth', authRoutes)
app.use('/usuarios', userRoutes)

/**
 * 🔐 ROTAS PROTEGIDAS (precisa login)
 */
app.use('/products', authMiddleware, productRoutes)
app.use('/cart', authMiddleware, cartRoutes)
app.use('/favoritos', authMiddleware, favoritosRoutes)

/**
 * 🚀 START SERVER
 */
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`)
})