import express, { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { createOrder, getUserOrders } from '../controllers/orderController';

const orderRoutes: Router = express.Router();

// Todas as rotas de pedidos precisam do usuário logado
orderRoutes.use(authMiddleware);

// ➕ Criar um novo pedido (Reserva)
orderRoutes.post('/', createOrder);

// 📦 Buscar pedidos do usuário logado
orderRoutes.get('/', getUserOrders);

export default orderRoutes;