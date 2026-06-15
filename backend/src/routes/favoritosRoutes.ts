import express, { Request, Response, Router } from 'express'
import { z } from 'zod'
import db from '../db/index'

const router: Router = express.Router()

// ===============================
// SCHEMA
// ===============================
const FavoritoSchema = z.object({
  UsuCodigo: z.coerce.number().int({ message: 'Código do usuário inválido' }),
  ProCodigo: z.coerce.number().int({ message: 'Código do produto inválido' })
})

// ===============================
// ADD FAVORITO
// ===============================
router.post('/', async (req: Request, res: Response) => {
  try {
    const { UsuCodigo, ProCodigo } = FavoritoSchema.parse(req.body)

    const checkQuery =
      'SELECT * FROM Favoritos WHERE UsuCodigo = ? AND ProCodigo = ?'

    const [existing]: any = await db.execute(checkQuery, [
      UsuCodigo,
      ProCodigo
    ])

    if (existing.length > 0) {
      return res
        .status(400)
        .json({ error: 'Este produto já está nos favoritos.' })
    }

    const dataHoje = new Date().toISOString().split('T')[0]

    const query =
      'INSERT INTO Favoritos (UsuCodigo, ProCodigo, DataAdicao) VALUES (?, ?, ?)'

    const [result]: any = await db.execute(query, [
      UsuCodigo,
      ProCodigo,
      dataHoje
    ])

    return res.status(201).json({
      message: 'Produto adicionado aos favoritos!',
      FavCodigo: result.insertId
    })
  } catch (error: any) {
    console.error(error)

    return res.status(400).json({
      error: error?.errors?.[0]?.message || 'Erro ao salvar no banco.'
    })
  }
})

// ===============================
// GET FAVORITOS POR USUÁRIO
// ===============================
router.get('/:usuCodigo', async (req: Request, res: Response) => {
  try {
    const { usuCodigo } = req.params

    const query = `
      SELECT f.FavCodigo, f.DataAdicao, p.ProCodigo, p.ProNome, p.ProPreco 
      FROM Favoritos f
      JOIN Produto p ON f.ProCodigo = p.ProCodigo
      WHERE f.UsuCodigo = ?
    `

    const [rows]: any = await db.execute(query, [usuCodigo])

    return res.json(rows)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Erro ao buscar favoritos no banco.' })
  }
})

// ===============================
// DELETE POR ID DO FAVORITO
// ===============================
router.delete('/:favCodigo', async (req: Request, res: Response) => {
  try {
    const { favCodigo } = req.params

    const query = 'DELETE FROM Favoritos WHERE FavCodigo = ?'

    await db.execute(query, [favCodigo])

    return res.json({ message: 'Produto removido dos favoritos!' })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ error: 'Erro ao remover favorito.' })
  }
})

// ===============================
// DELETE POR USUÁRIO + PRODUTO
// ===============================
router.delete(
  '/:usuCodigo/:proCodigo',
  async (req: Request, res: Response) => {
    try {
      const { usuCodigo, proCodigo } = req.params

      const sql =
        'DELETE FROM Favoritos WHERE UsuCodigo = ? AND ProCodigo = ?'

      await db.execute(sql, [usuCodigo, proCodigo])

      return res.status(200).json({
        mensagem: 'Produto removido dos favoritos com sucesso!'
      })
    } catch (erro) {
      console.error('Erro ao remover favorito:', erro)

      return res
        .status(500)
        .json({ erro: 'Erro ao remover dos favoritos.' })
    }
  }
)

export default router