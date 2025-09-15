-- TABELAS DO ESTOQUE
CREATE TABLE IF NOT EXISTS autor (
id SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
nacionalidade VARCHAR(30),
data_nascimento DATE,

CONSTRAINT unique_autor UNIQUE (nome, data_nascimento)
);

CREATE TABLE IF NOT EXISTS editora (
id SERIAL PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
cnpj CHAR(14) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS livro (
isbn VARCHAR(13) PRIMARY KEY,
titulo VARCHAR(300) NOT NULL,
genero VARCHAR(30),
ano_publicacao INT NOT NULL,
id_autor INT NOT NULL,
id_editora INT NOT NULL,

FOREIGN KEY (id_autor) REFERENCES autor(id) ON DELETE CASCADE,
FOREIGN KEY (id_editora) REFERENCES editora(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS estoque (
isbn VARCHAR(13) NOT NULL,
edicao INT NOT NULL,
preco_unitario NUMERIC(7,2) NOT NULL,
quantidade_estoque INT NOT NULL DEFAULT 0 CHECK (quantidade_estoque >= 0),

PRIMARY KEY (isbn, edicao),
FOREIGN KEY (isbn) REFERENCES livro(isbn) ON DELETE CASCADE
);