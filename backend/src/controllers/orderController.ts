import { Request, Response } from 'express';
import { createOrderService, getUserOrdersService } from '../services/orderService';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id; 
    const { tipo, total, itens, nome, telephone: telefone } = req.body;

    // Se o front enviar 'telefone' ou 'telephone', pegamos corretamente
    const telefoneCliente = telefone || req.body.telefone;

    const novoPedido = await createOrderService(userId, tipo, total, itens, nome, telefoneCliente);

    return res.status(201).json({ message: 'Pedido criado com sucesso', pedido: novoPedido });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return res.status(500).json({ message: 'Erro ao criar pedido', error });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const pedidos = await getUserOrdersService(userId);
    
    return res.status(200).json(pedidos);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return res.status(500).json({ message: 'Erro ao buscar pedidos', error });
  }
};