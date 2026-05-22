-- Criação da tabela Usuário
CREATE TABLE Usuario (
UsuCodigo INTEGER PRIMARY KEY,
UsuNome VARCHAR(100),
UsuLogin VARCHAR(50) UNIQUE,
UsuSenha VARCHAR(255),
UsuEmail VARCHAR(100),
UsuTipo VARCHAR(20)
);

-- Criação da tabela Cliente
CREATE TABLE Cliente (
CliCodigo INTEGER PRIMARY KEY,
CliNome VARCHAR(100),
CliTelefone VARCHAR(20)
);

-- Criação da tabela Produto
CREATE TABLE Produto (
ProCodigo INTEGER PRIMARY KEY,
ProNome VARCHAR(100),
ProPreco DECIMAL(10,2),
ProEstoque INTEGER
);

-- Criação da tabela Venda
CREATE TABLE Venda (
VenCodigo INTEGER PRIMARY KEY,
CliCodigo INTEGER,
Data DATE,
Total DECIMAL(10,2),
FOREIGN KEY (CliCodigo) REFERENCES Cliente(CliCodigo)
);

-- Criação da tabela ItensVenda
CREATE TABLE ItensVenda (
IteCodigo INTEGER PRIMARY KEY,
VenCodigo INTEGER,
ProCodigo INTEGER,
Quantidade INTEGER,
PrecoUnitario DECIMAL(10,2),
FOREIGN KEY (VenCodigo) REFERENCES Venda(VenCodigo),
FOREIGN KEY (ProCodigo) REFERENCES Produto(ProCodigo)
);