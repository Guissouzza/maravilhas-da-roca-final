import pool from '../db/index'

// ===============================
// GET ALL
// ===============================
export const getAll = async () => {
  const [rows]: any = await pool.execute(
    'SELECT * FROM Produto ORDER BY ProCodigo ASC'
  )

  return rows
}

// ===============================
// GET BY ID
// ===============================
export const getById = async (id: number) => {
  const [rows]: any = await pool.execute(
    'SELECT * FROM Produto WHERE ProCodigo = ?',
    [id]
  )

  return rows[0]
}

// ===============================
// CREATE
// ===============================
export const create = async (name: string, description: string, price: number, image: string, category: string) => {
  const [result]: any = await pool.execute(
    `INSERT INTO Produto (ProNome, ProDesc, ProPreco, ProImagem, ProCategoria) VALUES (?, ?, ?, ?, ?)`,
    [name, description, price, image, category]
  )
  return result.insertId
}

// ===============================
// UPDATE
// ===============================
export const update = async (id: number, name: string, description: string, price: number, image: string, category: string) => {
  const [result]: any = await pool.execute(
    `UPDATE Produto SET ProNome = ?, ProDesc = ?, ProPreco = ?, ProImagem = ?, ProCategoria = ? WHERE ProCodigo = ?`,
    [name, description, price, image, category, id]
  )
  return result.affectedRows
}

// ===============================
// DELETE
// ===============================
export const remove = async (id: number) => {
  const [result]: any = await pool.execute(
    'DELETE FROM Produto WHERE ProCodigo = ?',
    [id]
  )

  return result.affectedRows
}