const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function instalarBanco() {
  try {
    console.log('⏳ Conectando ao Aiven para criar as tabelas...');
    
    // Conecta usando a sua URL e habilitando a execução de múltiplos comandos
    const conexao = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      multipleStatements: true 
    });

    // Lê o arquivo script.sql que está na pasta src/db
    const caminhoScript = path.join(__dirname, 'src', 'db', 'script.sql');
    const sql = fs.readFileSync(caminhoScript, 'utf8');

    // Executa o script no banco de dados
    console.log('⏳ Rodando o script.sql...');
    await conexao.query(sql);

    console.log('✅ SUCESSO! Tabelas criadas no Aiven perfeitamente!');
    process.exit(0);
    
  } catch (erro) {
    console.error('❌ Ops, deu erro ao criar as tabelas:');
    console.error(erro.message);
    process.exit(1);
  }
}

instalarBanco();