const express = require('express');
const { z } = require('zod');
const router = express.Router();
const db = require('../db/connection'); 

const FavoritoSchema = z.object({
  UsuCodigo: z.number({ required_error: "O código do usuário é obrigatório." }),
  ProCodigo: z.number({ required_error: "O código do produto é obrigatório." })
});

// 1. ADICIONAR AOS FAVORITOS (CREATE)
router.post('/', async (req, res) => {
  try {
    const { UsuCodigo, ProCodigo } = FavoritoSchema.parse(req.body);
    const dataHoje = new Date().toISOString().split('T')[0];

    const query = 'INSERT INTO Favoritos (UsuCodigo, ProCodigo, DataAdicao) VALUES (?, ?, ?)';
    const [result] = await db.execute(query, [UsuCodigo, ProCodigo, dataHoje]);

    return res.status(201).json({ 
      message: "Produto adicionado aos favoritos!", 
      FavCodigo: result.insertId 
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.errors ? error.errors[0].message : "Erro ao salvar no banco." });
  }
});

// 2. LISTAR FAVORITOS DE UM USUÁRIO (READ)
router.get('/:usuCodigo', async (req, res) => {
  try {
    const { usuCodigo } = req.params;

    const query = `
      SELECT f.FavCodigo, f.DataAdicao, p.ProCodigo, p.ProNome, p.ProPreco 
      FROM Favoritos f
      JOIN Produto p ON f.ProCodigo = p.ProCodigo
      WHERE f.UsuCodigo = ?
    `;

    const [rows] = await db.execute(query, [usuCodigo]);
    return res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar favoritos no banco." });
  }
});

// 3. REMOVER DOS FAVORITOS (DELETE)
router.delete('/:favCodigo', async (req, res) => {
  try {
    const { favCodigo } = req.params;

    const query = 'DELETE FROM Favoritos WHERE FavCodigo = ?';
    await db.execute(query, [favCodigo]);

    return res.json({ message: "Produto removido dos favoritos!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao remover favorito." });
  }
});

module.exports = router;

router.delete('/:usuCodigo/:proCodigo', async (req, res) => {
  try {
    const { usuCodigo, proCodigo } = req.params;
    const sql = 'DELETE FROM Favoritos WHERE UsuCodigo = ? AND ProCodigo = ?';
    
    await conexao.query(sql, [usuCodigo, proCodigo]);
    res.status(200).json({ mensagem: 'Produto removido dos favoritos com sucesso!' });
  } catch (erro) {
    console.error('Erro ao remover favorito:', erro);
    res.status(500).json({ erro: 'Erro ao remover dos favoritos.' });
  }
});