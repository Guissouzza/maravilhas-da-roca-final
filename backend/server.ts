import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'

const app = express()

app.use(cors())
app.use(express.json())

// ==========================
// CONEXÃO COM O BANCO AIVEN (Corrigida!)
// ==========================
const db = mysql.createPool({
  host: 'mysql-1e69ce51-alinevitoriagomescosta28-d72e.l.aivencloud.com',
  port: 25080,
  user: 'avnadmin',
  password: process.env.DB_PASSWORD,
  database: 'defaultdb',
  ssl: { rejectUnauthorized: false } 
})

// ==========================
// FUNÇÃO PARA CRIAR A TABELA AUTOMATICAMENTE
// ==========================
async function inicializarBanco() {
  try {
    
    await db.query(`
      CREATE TABLE IF NOT EXISTS produtos (
        id INT AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        preco DECIMAL(10, 2) NOT NULL,
        imagem VARCHAR(255),
        PRIMARY KEY (id)
      );
    `)

    await db.query('TRUNCATE TABLE produtos;');

    const [rows]: any = await db.query('SELECT COUNT(*) as total FROM produtos');
    
    if (rows[0].total === 0) {
      const produtosIniciais = [
        ['Queijo Canastra Artesanal', 65.00, 'https://images.unsplash.com/photo-1528256846550-93000cc80eef?w=400'],
        ['Doce de Leite Viçosa (Pote)', 28.50, 'https://images.unsplash.com/photo-1600431521340-491ecd880be2?w=400'],
        ['Café Moído na Hora 500g', 32.00, 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400'],
        ['Mel de Abelha Puro 500ml', 42.00, 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400'],
        ['Goiabada Cascão de Colher', 18.90, 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400']
      ];

      for (const prod of produtosIniciais) {
        await db.query(
          'INSERT INTO produtos (nome, preco, imagem) VALUES (?, ?, ?)',
          [prod[0], prod[1], prod[2]]
        );
      }
      console.log('📦 Vitrine da roça adicionada com sucesso ao Aiven!');
    }

    console.log('✨ Conectado ao Aiven e tabela "produtos" verificada!');
  } catch (error) {
    console.error('❌ Erro no banco de dados:', error);
  }
}
// Executa a verificação do banco
inicializarBanco()

// ==========================
// BUSCAR PRODUTOS
// ==========================
app.get('/carrinho', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM produtos'
    )
    res.json(rows)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

// ==========================
// EXCLUIR PRODUTO
// ==========================
app.delete('/carrinho/:id', async (req, res) => {
  console.log("ID recebido para deletar:", req.params.id);
  try {
    const [result]: any = await db.query('DELETE FROM produtos WHERE id = ?', [req.params.id]);
    console.log("Linhas afetadas:", result.affectedRows);
    
    if (result.affectedRows === 0) {
      return res.status(404).send('Produto não encontrado');
    }
    
    res.status(200).send('Item removido com sucesso');
  } catch (error) {
    console.error("Erro ao deletar:", error);
    res.status(500).send('Erro ao remover do banco');
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
setInterval(async () => {
  try {
    await db.query('SELECT 1');
    console.log('⏰ Ping enviado ao Aiven para manter o banco acordado!');
  } catch (error) {
    console.error('Erro no ping de atividade:', error);
  }
}, 1000 * 60 * 60);