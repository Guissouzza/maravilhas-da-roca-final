import db from '../db';

export const createOrderService = async (userId: number, tipo: string, total: number, itens: any[], nome: string, telefone: string) => {
  
  // 1. PRIMEIRO: Valida se todos os itens possuem estoque disponível
  for (const item of itens) {
    const produtoId = item.id || item.produto_id || item.ProCodigo;
    const qtdPedida = item.quantidade || item.quantity;

    const [rows]: any = await db.execute(
      `SELECT ProNome, ProEstoque FROM Produto WHERE ProCodigo = ?`, 
      [produtoId]
    );

    if (rows.length === 0) {
      throw new Error(`Produto não encontrado.`);
    }

    const produto = rows[0];
    if (produto.ProEstoque < qtdPedida) {
      // Se o estoque for menor do que o cara quer comprar, joga um erro pro front pegar
      throw new Error(`O produto "${produto.ProNome}" acabou de esgotar ou não possui estoque suficiente.`);
    }
  }

  // 2. Cria o Pedido principal (Se passou na validação acima)
  const [pedidoResult]: any = await db.execute(
    `INSERT INTO Pedidos (usuario_id, tipo, status, total, nome_cliente, telefone_cliente) VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, tipo, 'pendente', total, nome, telefone]
  );
  
  const pedidoId = pedidoResult.insertId;

  // 3. Insere os itens e ATUALIZA O ESTOQUE no banco
  for (const item of itens) {
    const produtoId = item.id || item.produto_id || item.ProCodigo;
    const qtdPedida = item.quantidade || item.quantity;
    const precoUnitario = item.preco || item.ProPreco;

    // Insere o item do pedido
    await db.execute(
      `INSERT INTO ItensPedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)`,
      [pedidoId, produtoId, qtdPedida, precoUnitario]
    );

    // 🔥 BAIXA NO ESTOQUE: Subtrai a quantidade que o cliente comprou
    await db.execute(
      `UPDATE Produto SET ProEstoque = ProEstoque - ? WHERE ProCodigo = ?`,
      [qtdPedida, produtoId]
    );
  }

  // 4. Limpa o carrinho do usuário após fechar o pedido
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