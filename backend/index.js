const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { z } = require('zod');

const app = express();
const db = new sqlite3.Database('./maravilhas.db');

app.use(cors());
app.use(express.json());

db.run(`
  CREATE TABLE IF NOT EXISTS Produto (
    ProCodigo  INTEGER PRIMARY KEY AUTOINCREMENT,
    ProNome    VARCHAR(100) NOT NULL,
    ProPreco   DECIMAL(10,2) NOT NULL,
    ProEstoque INTEGER NOT NULL DEFAULT 0
  )
`);

const produtoSchema = z.object({
  ProNome:    z.string().min(1),
  ProPreco:   z.number().positive(),
  ProEstoque: z.number().int().min(0),
});

app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM Produto ORDER BY ProCodigo DESC', (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

app.get('/produtos/:id', (req, res) => {
  db.get('SELECT * FROM Produto WHERE ProCodigo = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!row) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.json(row);
  });
});

app.post('/produtos', (req, res) => {
  const result = produtoSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ erro: result.error.flatten() });

  const { ProNome, ProPreco, ProEstoque } = result.data;
  db.run(
    'INSERT INTO Produto (ProNome, ProPreco, ProEstoque) VALUES (?, ?, ?)',
    [ProNome, ProPreco, ProEstoque],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      db.get('SELECT * FROM Produto WHERE ProCodigo = ?', [this.lastID], (err, row) => {
        res.status(201).json(row);
      });
    }
  );
});

app.put('/produtos/:id', (req, res) => {
  const result = produtoSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json({ erro: result.error.flatten() });

  const { ProNome, ProPreco, ProEstoque } = result.data;
  db.run(
    'UPDATE Produto SET ProNome = ?, ProPreco = ?, ProEstoque = ? WHERE ProCodigo = ?',
    [ProNome, ProPreco, ProEstoque, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: 'Produto não encontrado' });
      db.get('SELECT * FROM Produto WHERE ProCodigo = ?', [req.params.id], (err, row) => {
        res.json(row);
      });
    }
  );
});

app.delete('/produtos/:id', (req, res) => {
  db.run('DELETE FROM Produto WHERE ProCodigo = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    if (this.changes === 0) return res.status(404).json({ erro: 'Produto não encontrado' });
    res.status(204).send();
  });
});

app.listen(3000, () => console.log('Backend rodando em http://localhost:3000'));
