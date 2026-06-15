import express, { Router } from 'express'
import authMiddleware from '../middlewares/authMiddleware'

import {
  addToCart,
  getCart,
  removeItemFromCart,
  updateCartItem
} from '../controllers/cartController'

const cartRoutes: Router = express.Router()

// 🔐 todas rotas do carrinho precisam de login
cartRoutes.use(authMiddleware)

// ➕ adicionar item
cartRoutes.post('/add', addToCart)

// 📦 pegar carrinho do usuário logado
cartRoutes.get('/', getCart)

// 🔁 atualizar quantidade
cartRoutes.put('/item', updateCartItem)

// ❌ remover item
cartRoutes.delete('/item', removeItemFromCart)

export default cartRoutes