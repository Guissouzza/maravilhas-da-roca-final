import { Router } from 'express'
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController'

import authMiddleware from '../middlewares/authMiddleware'
import adminMiddleware from '../middlewares/adminMiddleware'

const router = Router()

// 📦 LISTAR TODOS OS PRODUTOS
router.get('/', getAllProducts)

// 📦 BUSCAR PRODUTO POR ID
router.get('/:id', getProductById)

// 🔐 CRIAR PRODUTO (ADMIN)
router.post('/', authMiddleware, adminMiddleware, createProduct)

// 🔐 ATUALIZAR PRODUTO (ADMIN)
router.put('/:id', authMiddleware, adminMiddleware, updateProduct)

// 🔐 DELETAR PRODUTO (ADMIN)
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct)

export default router