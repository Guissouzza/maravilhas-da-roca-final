DROP TABLE IF EXISTS Produto;

CREATE TABLE Produto (
  ProCodigo INTEGER PRIMARY KEY,
  ProNome VARCHAR(100),
  ProDesc VARCHAR(100),
  ProPreco DECIMAL(10,2),
  ProEstoque INTEGER,
  ProImagem VARCHAR(255)
);

INSERT INTO Produto
(ProCodigo, ProNome, ProDesc, ProPreco, ProEstoque, ProImagem)
VALUES
(9, 'Queijo Canastra', 'Queijo curado artesanal da Serra da Canastra', 34.90, 12, 'queijo_canastra.png'),
(10, 'Doce de Leite', 'Tradicional doce de leite mineiro feito no tacho', 26.50, 18, 'doce_de_leite.png'),
(11, 'Mel Puro', 'Mel natural extraído diretamente dos apiários', 22.90, 15, 'mel_puro.jpg'),
(12, 'Leite Fresco', 'Leite integral fresco direto da fazenda', 8.50, 20, 'leite_fresco.avif'),
(13, 'Requeijão Caseiro', 'Requeijão cremoso artesanal da roça', 15.90, 14, 'requeijao_caseiro.png'),
(14, 'Cachaça Artesanal', 'Cachaça envelhecida em barril de carvalho', 45.00, 8, 'cachaça_artesanal.jpg'),
(15, 'Compota de Figo', 'Compota artesanal de figo feita no tacho', 17.50, 9, 'compota_figo.jpg'),
(16, 'Geleia de Morango', 'Geleia natural sem conservantes', 13.90, 18, 'geleia_morango.jpg');