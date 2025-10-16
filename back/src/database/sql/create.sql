-- CREATE TYPE USER_ROLE as ENUM ('cliente', 'admin');
-- CREATE TYPE PAYMENT_TYPE as ENUM ('debito', 'credito', 'pix', 'dinheiro');
-- CREATE TYPE DELIVERY_STATUS as ENUM ('aguardando_pagamento', 'confirmado', 'a_caminho', 'entregue');

CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(60) NOT NULL,
    endereco VARCHAR(200),
    funcao USER_ROLE NOT NULL DEFAULT 'cliente'
);

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
    isbn CHAR(13) PRIMARY KEY,
    titulo VARCHAR(300) NOT NULL,
    genero VARCHAR(30),
    ano_publicacao INT,
    id_autor INT NOT NULL,
    id_editora INT NOT NULL,
    imagem_capa TEXT DEFAULT NULL,
    sinopse TEXT,

    FOREIGN KEY (id_autor) REFERENCES autor(id) ON DELETE CASCADE,
    FOREIGN KEY (id_editora) REFERENCES editora(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS estoque (
    isbn CHAR(13) PRIMARY KEY,
    preco_unitario NUMERIC(7,2) NOT NULL,
    quantidade_estoque INT NOT NULL DEFAULT 0 CHECK (quantidade_estoque >= 0),

    FOREIGN KEY (isbn) REFERENCES livro(isbn) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pedido (
    id SERIAL PRIMARY KEY,
    id_usuario INT,
    data_compra TIMESTAMP NOT NULL DEFAULT NOW(),
    quantidade_total INT NOT NULL DEFAULT 0,
    situacao_entrega DELIVERY_STATUS DEFAULT 'aguardando_pagamento',

    -- Revisar lógica de exclusão de pedido
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS item_pedido (
    id_pedido INT NOT NULL,
    isbn_livro CHAR(13) NOT NULL,
    quantidade INT NOT NULL CHECK (quantidade >= 0),

    PRIMARY KEY (id_pedido, isbn_livro),
    FOREIGN KEY (id_pedido) REFERENCES pedido(id) ON DELETE CASCADE,
    FOREIGN KEY (isbn_livro) REFERENCES livro(isbn) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pagamento (
    id SERIAL PRIMARY KEY,
    valor NUMERIC(7,2) NOT NULL,
    forma_pagamento PAYMENT_TYPE
);

CREATE TABLE IF NOT EXISTS validacao_pagamento (
    id_pedido INT,
    id_pagamento INT,
    confirmacao BOOLEAN DEFAULT FALSE,

    PRIMARY KEY (id_pedido, id_pagamento),

    -- Revisar lógica de exclusão de validação
    FOREIGN KEY (id_pedido) REFERENCES pedido(id) ON DELETE SET NULL,
    FOREIGN KEY (id_pagamento) REFERENCES pagamento(id) ON DELETE SET NULL
);