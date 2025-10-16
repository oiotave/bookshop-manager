DROP VIEW IF EXISTS info_livro;
DROP VIEW IF EXISTS other_info_livro;
DROP VIEW IF EXISTS filtro_livro;
DROP VIEW IF EXISTS info_itens;
DROP VIEW IF EXISTS preco_itens;
DROP VIEW IF EXISTS relatorio_vendas;

-- Mostra as informações centrais de um livro
CREATE OR REPLACE VIEW info_livro AS
    SELECT livro.isbn AS isbn, titulo, ano_publicacao, imagem_capa, nome, preco_unitario FROM livro
    JOIN autor ON livro.id_autor = autor.id
    JOIN estoque ON livro.isbn = estoque.isbn;

-- Mostra outras informações relevantes do livro
CREATE OR REPLACE VIEW other_info_livro AS
    SELECT livro.isbn AS isbn, livro.genero, livro.ano_publicacao, livro.sinopse, editora.nome, estoque.quantidade_estoque
    FROM livro JOIN editora ON livro.id_editora = editora.id
    JOIN estoque ON livro.isbn = estoque.isbn;

-- Filtra campos essenciais do livro
CREATE OR REPLACE VIEW filtro_livro AS
    SELECT livro.isbn, titulo, ano_publicacao, imagem_capa, genero, autor.nacionalidade, autor.nome, estoque.preco_unitario
    FROM livro JOIN autor ON livro.id_autor = autor.id
    JOIN estoque ON livro.isbn = estoque.isbn;

-- Mostra informações principais dos itens de um pedido
CREATE OR REPLACE VIEW info_itens AS
    SELECT id_pedido, isbn_livro, titulo, quantidade
    FROM item_pedido
    JOIN livro ON isbn_livro = isbn;

-- Mostra informações de preço dos itens de um pedido
CREATE OR REPLACE VIEW preco_itens AS
    SELECT id_pedido, isbn_livro, quantidade * preco_unitario AS preco
    FROM item_pedido
    JOIN estoque ON isbn_livro = isbn;

CREATE OR REPLACE VIEW relatorio_vendas AS
    SELECT usuario.nome, pedido.id, pedido.data_compra FROM pedido
    JOIN usuario ON pedido.id_usuario = usuario.id;