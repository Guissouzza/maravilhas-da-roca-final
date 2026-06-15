import db from '../db/index'

// 🧾 TIPOS
interface CartItem {
  ProCodigo: number
  ProNome: string
  ProPreco: number
  ProImagem: string
  CarItemQuantidade: number
}

// ➕ adicionar item
export const addItemService = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  const [cart]: any = await db.query(
    'SELECT * FROM Carrinho WHERE CarUsuarioId = ?',
    [userId]
  )

  let cartId: number

  if (!cart.length) {
    const [result]: any = await db.query(
      'INSERT INTO Carrinho (CarUsuarioId) VALUES (?)',
      [userId]
    )

    cartId = result.insertId
  } else {
    cartId = cart[0].CarCodigo
  }

  const [item]: any = await db.query(
    'SELECT * FROM CarrinhoItem WHERE CarCodigo = ? AND ProCodigo = ?',
    [cartId, productId]
  )

  if (item.length) {
    await db.query(
      `UPDATE CarrinhoItem 
       SET CarItemQuantidade = CarItemQuantidade + ?
       WHERE CarCodigo = ? AND ProCodigo = ?`,
      [quantity, cartId, productId]
    )
  } else {
    await db.query(
      `INSERT INTO CarrinhoItem (CarCodigo, ProCodigo, CarItemQuantidade)
       VALUES (?, ?, ?)`,
      [cartId, productId, quantity]
    )
  }

  return { message: 'Item adicionado ao carrinho' }
}

// 📦 pegar carrinho
export const getCartService = async (userId: number) => {
  const [cart]: any = await db.query(
    'SELECT * FROM Carrinho WHERE CarUsuarioId = ?',
    [userId]
  )

  if (!cart.length) {
    return { items: [], total: 0 }
  }

  const cartId = cart[0].CarCodigo

  const [items]: any = await db.query(
    `SELECT 
      ci.ProCodigo,
      ci.CarItemQuantidade,
      p.ProNome,
      p.ProPreco,
      p.ProImagem
     FROM CarrinhoItem ci
     JOIN Produto p ON p.ProCodigo = ci.ProCodigo
     WHERE ci.CarCodigo = ?`,
    [cartId]
  )

  const total = (items as CartItem[]).reduce(
    (sum, item) => sum + item.ProPreco * item.CarItemQuantidade,
    0
  )

  return {
    items,
    total
  }
}

// 🔁 atualizar item
export const updateItemService = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  const [cart]: any = await db.query(
    'SELECT * FROM Carrinho WHERE CarUsuarioId = ?',
    [userId]
  )

  if (!cart.length) return { message: 'Carrinho não encontrado' }

  await db.query(
    `UPDATE CarrinhoItem 
     SET CarItemQuantidade = ?
     WHERE CarCodigo = ? AND ProCodigo = ?`,
    [quantity, cart[0].CarCodigo, productId]
  )

  return { message: 'Item atualizado' }
}

// ❌ remover item
export const removeItemService = async (
  userId: number,
  productId: number
) => {
  const [cart]: any = await db.query(
    'SELECT * FROM Carrinho WHERE CarUsuarioId = ?',
    [userId]
  )

  if (!cart.length) return { message: 'Carrinho não encontrado' }

  await db.query(
    'DELETE FROM CarrinhoItem WHERE CarCodigo = ? AND ProCodigo = ?',
    [cart[0].CarCodigo, productId]
  )

  return { message: 'Item removido' }
}