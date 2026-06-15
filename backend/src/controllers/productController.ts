import { Request, Response } from 'express'
import * as productService from '../services/productService'

// ===============================
// GET ALL PRODUCTS
// ===============================
export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const rows = await productService.getAll()

    const formatted = rows.map((prod: any) => ({
      id: prod.ProCodigo,
      name: prod.ProNome,
      description: prod.ProDesc,
      price: Number(prod.ProPreco),
      image: prod.ProImagem
    }))

    return res.json(formatted)
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno ao buscar produtos' })
  }
}

// ===============================
// GET BY ID
// ===============================
export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id)

    const prod = await productService.getById(id)

    if (!prod) {
      return res.status(404).json({ error: 'Produto não encontrado' })
    }

    return res.json({
      id: prod.ProCodigo,
      name: prod.ProNome,
      description: prod.ProDesc,
      price: Number(prod.ProPreco),
      image: prod.ProImagem
    })
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno' })
  }
}

// ===============================
// CREATE
// ===============================
export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, description, price, image } = req.body

    const id = await productService.create(
      name,
      description,
      price,
      image
    )

    return res.status(201).json({
      message: 'Produto criado com sucesso!',
      id
    })
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar produto' })
  }
}

// ===============================
// UPDATE
// ===============================
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id)
    const { name, description, price, image } = req.body

    const affected = await productService.update(
      id,
      name,
      description,
      price,
      image
    )

    if (affected === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' })
    }

    return res.json({ message: 'Produto atualizado com sucesso' })
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar produto' })
  }
}

// ===============================
// DELETE
// ===============================
export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = Number(req.params.id)

    const affected = await productService.remove(id)

    if (affected === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' })
    }

    return res.json({ message: 'Produto deletado com sucesso' })
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar produto' })
  }
}