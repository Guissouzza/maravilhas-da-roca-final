-- =========================
-- DROP (ordem correta)
-- =========================
DROP TABLE IF EXISTS CarrinhoItem;
DROP TABLE IF EXISTS Carrinho;
DROP TABLE IF EXISTS Produto;
DROP TABLE IF EXISTS Usuario;

-- =========================
-- USUÁRIO
-- =========================
CREATE TABLE Usuario (
  UsuCodigo INT AUTO_INCREMENT PRIMARY KEY,
  UsuNome VARCHAR(100) NOT NULL
);

-- =========================
-- PRODUTO (CATÁLOGO)
-- =========================
CREATE TABLE Produto (
  ProCodigo INT AUTO_INCREMENT PRIMARY KEY,
  ProNome VARCHAR(100) NOT NULL,
  ProDesc VARCHAR(255),
  ProPreco DECIMAL(10,2) NOT NULL,
  ProEstoque INT NOT NULL,
  ProImagem VARCHAR(255)
);

-- =========================
-- CARRINHO
-- =========================
CREATE TABLE Carrinho (
  CarCodigo INT AUTO_INCREMENT PRIMARY KEY,
  CarUsuarioId INT NOT NULL,
  CarDataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (CarUsuarioId) REFERENCES Usuario(UsuCodigo)
);

-- =========================
-- ITENS DO CARRINHO
-- =========================
CREATE TABLE CarrinhoItem (
  CarItemCodigo INT AUTO_INCREMENT PRIMARY KEY,
  CarCodigo INT NOT NULL,
  ProCodigo INT NOT NULL,
  CarItemQuantidade INT NOT NULL DEFAULT 1,

  FOREIGN KEY (CarCodigo) REFERENCES Carrinho(CarCodigo),
  FOREIGN KEY (ProCodigo) REFERENCES Produto(ProCodigo),

  UNIQUE KEY unique_cart_product (CarCodigo, ProCodigo)
);

-- =========================
-- DADOS INICIAIS
-- =========================

INSERT INTO Usuario (UsuNome)
VALUES ('Bruno Marinho');

INSERT INTO Produto
(ProNome, ProDesc, ProPreco, ProEstoque, ProImagem)
VALUES
('Queijo Canastra', 'Queijo curado artesanal da Serra da Canastra', 34.90, 12, 'queijo_canastra.png'),
('Doce de Leite', 'Tradicional doce de leite mineiro feito no tacho', 26.50, 18, 'doce_de_leite.png'),
('Mel Puro', 'Mel natural extraído diretamente dos apiários', 22.90, 15, 'mel_puro.jpg'),
('Leite Fresco', 'Leite integral fresco direto da fazenda', 8.50, 20, 'leite_fresco.avif'),
('Requeijão Caseiro', 'Requeijão cremoso artesanal da roça', 15.90, 14, 'requeijao_caseiro.png'),
('Cachaça Artesanal', 'Cachaça envelhecida em barril de carvalho', 45.00, 8, 'cachaça_artesanal.jpg'),
('Compota de Figo', 'Compota artesanal de figo feita no tacho', 17.50, 9, 'compota_figo.jpg'),
('Geleia de Morango', 'Geleia natural sem conservantes', 13.90, 18, 'geleia_morango.jpg');
