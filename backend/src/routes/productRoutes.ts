import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController'
import authMiddleware from '../middlewares/authMiddleware'
import adminMiddleware from '../middlewares/adminMiddleware'
const router = Router();

// Vincula a rota GET /products à função do seu controller
router.get('/products', getAllProducts)

router.get('/products/:id', getProductById)

router.post('/products', authMiddleware, adminMiddleware, createProduct)

router.put('/products/:id', authMiddleware, adminMiddleware, updateProduct)

router.delete('/products/:id', authMiddleware, adminMiddleware, deleteProduct)

export default router;