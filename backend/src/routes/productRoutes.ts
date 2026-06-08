import { Router } from 'express';
import { getAllProducts } from '../controllers/productController';

const router = Router();

// Vincula a rota GET /products à função do seu controller
router.get('/products', getAllProducts);

export default router;