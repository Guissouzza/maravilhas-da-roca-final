import { Request, Response } from 'express'
import pool from '../db/index'

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM Produto ORDER BY ProCodigo ASC'
    )

    const formattedProducts = rows.map((prod) => ({
      id: prod.ProCodigo,
      name: prod.ProNome,
      description: prod.ProDesc,
      price: Number(prod.ProPreco),
      image: prod.ProImagem
    }))

    return res.status(200).json(formattedProducts)
  } catch (error) {
    console.error('Erro ao buscar produtos no MySQL:', error)

    return res
      .status(500)
      .json({ error: 'Erro interno ao buscar produtos' })
  }
}