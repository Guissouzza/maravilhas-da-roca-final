import { Request, Response } from 'express';
import { getPool } from '../db/index';

export const getAllProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    // pega o pool corretamente
    const pool = getPool();

    // busca os produtos
    const [rows]: any = await pool.query(
      'SELECT * FROM Produto ORDER BY ProCodigo ASC'
    );

    // formata para o frontend
    const formattedProducts = rows.map((prod: any) => ({
      id: prod.ProCodigo,
      name: prod.ProNome,
      description: prod.ProDesc,
      price: Number(prod.ProPreco),
      image: prod.ProImagem
    }));

    return res.status(200).json(formattedProducts);

  } catch (error) {
    console.error("Erro ao buscar produtos no MySQL:", error);
    return res.status(500).json({ error: "Erro interno ao buscar produtos" });
  }
};