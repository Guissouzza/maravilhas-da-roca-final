const mysql = require('mysql2/promise');
require('dotenv').config();

async function simularTodosOsDados() {
  try {
    const conexao = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      multipleStatements: true
    });

    const sql = `
      INSERT IGNORE INTO Usuario (UsuCodigo, UsuNome, UsuLogin, UsuSenha, UsuEmail, UsuTipo)
      VALUES (1, 'Victor', 'victor123', 'senha123', 'victor@email.com', 'Cliente');

      INSERT IGNORE INTO Produto (ProCodigo, ProNome, ProPreco, ProEstoque)
      VALUES 
      (1, 'Queijo', 45.90, 10),
      (2, 'Doce de Leite', 25.50, 15),
      (3, 'Café', 30.00, 20),
      (4, 'Mel', 35.00, 12),
      (5, 'Suplemento', 68.90, 8),
      (6, 'Whey', 42.00, 20);

      INSERT IGNORE INTO Favoritos (UsuCodigo, ProCodigo)
      VALUES 
      (1, 1),
      (1, 2),
      (1, 4),
      (1, 5),
      (1, 6);
    `;

    console.log('...');
    await conexao.query(sql);

    console.log('SUCESSO');
    process.exit(0);
    
  } catch (erro) {
    console.error('❌ Erro ao inserir:', erro.message);
    process.exit(1);
  }
}

simularTodosOsDados();