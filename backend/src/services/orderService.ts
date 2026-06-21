import db from '../db'; // ⚠️ Lembre-se de verificar se o caminho para a base de dados está correto

export const createOrderService = async (userId: number, tipo: string, total: number, itens: any[], nome: string, telefone: string) => {
  // 1. Cria o Pedido principal
  const [pedidoResult]: any = await db.execute(
    `INSERT INTO Pedidos (usuario_id, tipo, status, total, nome_cliente, telefone_cliente) VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, tipo, 'pendente', total, nome, telefone]
  );
  
  const pedidoId = pedidoResult.insertId;

  // 2. Insere os itens do pedido (ItensPedido)
  for (const item of itens) {
    await db.execute(
      `INSERT INTO ItensPedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)`,
      [pedidoId, item.id || item.produto_id || item.ProCodigo, item.quantidade, item.preco]
    );
  }

  // 3. Limpar o carrinho do utilizador após a compra
  const [carrinho]: any = await db.execute(`SELECT CarCodigo FROM Carrinho WHERE UsuCodigo = ?`, [userId]);
  if (carrinho.length > 0) {
    await db.execute(`DELETE FROM CarrinhoItem WHERE CarCodigo = ?`, [carrinho[0].CarCodigo]);
  }

  return { pedidoId, total, tipo, status: 'pendente' };
};

export const getUserOrdersService = async (userId: number) => {
  // Busca todos os pedidos do utilizador
  const [pedidos]: any = await db.execute(
    `SELECT id, DATE_FORMAT(CONVERT_TZ(data_criacao, '+00:00', '-03:00'), '%d/%m/%Y %H:%i') as data, tipo, status, total 
    FROM Pedidos WHERE usuario_id = ? ORDER BY data_criacao DESC`,
    [userId]
  );

  // Para cada pedido, busca os itens
  for (let pedido of pedidos) {
    const [itens]: any = await db.execute(
      `SELECT ip.quantidade, p.ProNome as nome, ip.preco_unitario as preco
       FROM ItensPedido ip
       JOIN Produto p ON ip.produto_id = p.ProCodigo
       WHERE ip.pedido_id = ?`,
      [pedido.id]
    );
    pedido.itens = itens;
  }

  return pedidos;
};