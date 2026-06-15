import pool from '../db/index'

export const FavoritoService = {
  async addFavorito(UsuCodigo: number, ProCodigo: number) {
    const [existing]: any = await pool.execute(
      'SELECT * FROM Favoritos WHERE UsuCodigo = ? AND ProCodigo = ?',
      [UsuCodigo, ProCodigo]
    )

    if (existing.length > 0) {
      throw new Error('Este produto já está nos favoritos.')
    }

    const dataHoje = new Date().toISOString().split('T')[0]

    const [result]: any = await pool.execute(
      'INSERT INTO Favoritos (UsuCodigo, ProCodigo, DataAdicao) VALUES (?, ?, ?)',
      [UsuCodigo, ProCodigo, dataHoje]
    )

    return result.insertId
  },

  async getFavoritosByUser(UsuCodigo: number) {
    const [rows] = await pool.execute(
      `
      SELECT f.FavCodigo, f.DataAdicao, p.ProCodigo, p.ProNome, p.ProPreco 
      FROM Favoritos f
      JOIN Produto p ON f.ProCodigo = p.ProCodigo
      WHERE f.UsuCodigo = ?
      `,
      [UsuCodigo]
    )

    return rows
  },

  async deleteById(favCodigo: number) {
    await pool.execute(
      'DELETE FROM Favoritos WHERE FavCodigo = ?',
      [favCodigo]
    )
  },

  async deleteByUserAndProduct(usuCodigo: number, proCodigo: number) {
    await pool.execute(
      'DELETE FROM Favoritos WHERE UsuCodigo = ? AND ProCodigo = ?',
      [usuCodigo, proCodigo]
    )
  }
}