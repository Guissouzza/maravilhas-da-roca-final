-- Criação da tabela Usuário
CREATE TABLE IF NOT EXISTS Usuario (
UsuCodigo INTEGER PRIMARY KEY,
UsuNome VARCHAR(100),
UsuLogin VARCHAR(50) UNIQUE,
UsuSenha VARCHAR(255),
UsuEmail VARCHAR(100),
UsuTipo VARCHAR(20)
);

-- Criação da tabela Cliente
CREATE TABLE IF NOT EXISTS Cliente (
CliCodigo INTEGER PRIMARY KEY,
CliNome VARCHAR(100),
CliTelefone VARCHAR(20)
);

-- Criação da tabela Produto
CREATE TABLE IF NOT EXISTS Produto (
ProCodigo INTEGER PRIMARY KEY,
ProNome VARCHAR(100),
ProPreco DECIMAL(10,2),
ProEstoque INTEGER
);

-- Criação da tabela Venda
CREATE TABLE IF NOT EXISTS Venda (
VenCodigo INTEGER PRIMARY KEY,
CliCodigo INTEGER,
Data DATE,
Total DECIMAL(10,2),
FOREIGN KEY (CliCodigo) REFERENCES Cliente(CliCodigo)
);

-- Criação da tabela ItensVenda
CREATE TABLE IF NOT EXISTS ItensVenda (
IteCodigo INTEGER PRIMARY KEY,
VenCodigo INTEGER,
ProCodigo INTEGER,
Quantidade INTEGER,
PrecoUnitario DECIMAL(10,2),
FOREIGN KEY (VenCodigo) REFERENCES Venda(VenCodigo),
FOREIGN KEY (ProCodigo) REFERENCES Produto(ProCodigo)
);

-- Criação da tabela Favoritos
CREATE TABLE IF NOT EXISTS Favoritos (
  FavCodigo INTEGER AUTO_INCREMENT PRIMARY KEY,
  UsuCodigo INTEGER,
  ProCodigo INTEGER,
  DataAdicao DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (UsuCodigo) REFERENCES Usuario(UsuCodigo),
  FOREIGN KEY (ProCodigo) REFERENCES Produto(ProCodigo)
);