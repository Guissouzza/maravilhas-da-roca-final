require('dotenv').config(); // ESSA LINHA PRECISA SER A NÚMERO 1 DO ARQUIVO
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração original e segura mapeada para as variáveis do .env
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '27794'),
    ssl: {
        rejectUnauthorized: false
    }
};

// Criando o Pool de Conexões (Conforme citado na apresentação do grupo)
const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/**
 * 🔄 SISTEMA ANTI-HIBERNAÇÃO (Keep-Alive para a Aiven)
 * Faz uma consulta leve a cada 10 minutos (600.000 ms) para impedir que o banco gratuito entre em modo de "sleep".
 */
setInterval(async () => {
    try {
        const [rows] = await pool.execute('SELECT 1');
        console.log('📌 Ping Keep-Alive enviado com sucesso para a Aiven. Banco ativo!');
    } catch (error) {
        console.error('⚠️ Falha ao enviar o ping Keep-Alive:', error.message);
    }
}, 600000); // 10 minutos em milissegundos


const detalhesAdicionais = {
    1: {
        categoria: 'Laticínios Premium',
        descricao: 'Legítimo queijo da Serra da Canastra, maturado artesanalmente. Possui sabor marcante, casca amarelada e uma textura incrivelmente macia por dentro. Perfeito com um café passado na hora.',
        imagem_url: 'https://cdn.pixabay.com/photo/2018/05/27/16/10/cheese-3433777_600.jpg',
        specs: ['Origem: São Roque de Minas - MG', 'Maturação: 21 dias', 'Produção Familiar']
    },
    2: {
        categoria: 'Doces & Compotas',
        descricao: 'Mel 100% natural extraído de apiários sustentáveis. Sem adição de açúcares ou conservantes, preservando todas as propriedades e o sabor floral genuíno da roça.',
        imagem_url: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?q=80&w=600',
        specs: ['Volume: 350g', 'Florada: Silvestre', '100% Orgânico']
    }
};

// Rota que alimenta a sua tela de detalhes (Otimizada com o Pool)
app.get('/api/produtos/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        // O pool gerencia a abertura automaticamente de forma performática
        const [rows] = await pool.execute('SELECT * FROM Produto WHERE ProCodigo = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado na nuvem da Aiven.' });
        }

        const produtoBanco = rows[0];

        // Fichas técnicas baseadas no ID
        const specsPorId = id == 1 
            ? ['Origem: Serra da Canastra - MG', 'Maturação: 21 dias', 'Produção Familiar']
            : ['Volume: 350g', 'Florada: Silvestre', '100% Orgânico'];

        // Enviamos para o Vue exatamente o que veio do banco de dados
        res.json({
            id: produtoBanco.ProCodigo,
            name: produtoBanco.ProNome,
            preco: parseFloat(produtoBanco.ProPreco),
            estoque: produtoBanco.ProEstoque,
            imagem_url: produtoBanco.ProImagem, // VEIO DO BANCO!
            categoria: id == 1 ? 'Laticínios Premium' : 'Doces & Compotas',
            descricao: id == 1 
                ? 'Legítimo queijo da Serra da Canastra, maturado artesanalmente. Possui sabor marcante, casca amarelada e uma textura incrivelmente macia por dentro.'
                : 'Mel 100% natural extraído de apiários sustentáveis. Sem adição de açúcares ou conservantes, preservando todo o sabor genuíno da roça.',
            specs: specsPorId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro de conexão: ' + error.message });
    }
});

// Rota auxiliar que CRIA a tabela na Aiven e insere os produtos
app.get('/api/teste/popular', async (req, res) => {
    try {
        // Pegamos uma conexão isolada do pool para operações estruturais (DDL)
        const connection = await pool.getConnection();
        
        // 1. Deleta a tabela antiga se ela estiver travada com a estrutura velha
        await connection.execute('DROP TABLE IF EXISTS Produto');

        // 2. Cria a tabela nova com a coluna ProImagem incluída
        await connection.execute(`
            CREATE TABLE Produto (
                ProCodigo INT PRIMARY KEY, 
                ProNome VARCHAR(100), 
                ProPreco DECIMAL(10,2), 
                ProEstoque INT,
                ProImagem VARCHAR(255)
            )
        `);
        
        // 3. Links de imagens oficiais salvos direto na nuvem
        await connection.execute(`
            INSERT INTO Produto (ProCodigo, ProNome, ProPreco, ProEstoque, ProImagem) VALUES 
            (1, 'Queijo Canastra Real', 48.90, 15, 'https://picsum.photos/id/493/600/600'),
            (2, 'Mel Silvestre Puro', 29.90, 30, 'https://picsum.photos/id/312/600/600')
        `);
        
        // Libera a conexão de volta para o Pool
        connection.release();

        res.json({ message: 'Banco atualizado! Tabela recriada e imagens salvas direto na nuvem!' });
    } catch (error) {
        console.error("Erro completo no banco: ", error);
        res.status(500).json({ error: error.message || "Erro interno no banco. Olhe o terminal do VS Code!"});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend rodando com sucesso! Sistema Keep-Alive ativado para a Aiven. Porta: ${PORT}`);
});

const favoritosRoutes = require('./src/routes/favoritos');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

app.use('/api/favoritos', favoritosRoutes);

app.use('/', (req, res) => {
  res.send('Servidor do Maravilhas da Roça rodando com sucesso');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando perfeitamente na porta ${PORT}`);
});