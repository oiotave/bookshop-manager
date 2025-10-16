-- Remove todo o conjunto de pedido e pagamento quando não há mais itens no pedido
CREATE OR REPLACE PROCEDURE remocao_pedido(p_id_pedido INT)
LANGUAGE PLPGSQL AS $$
DECLARE v_id_pagamento INT;
BEGIN
    SELECT id_pagamento INTO v_id_pagamento FROM validacao_pagamento
    WHERE id_pedido = p_id_pedido AND confirmacao = false;

    DELETE FROM validacao_pagamento
    WHERE id_pagamento = v_id_pagamento AND id_pedido = p_id_pedido;

    DELETE FROM pagamento
    WHERE id = v_id_pagamento;

    DELETE FROM pedido
    WHERE id = p_id_pedido;
END;
$$;

CREATE OR REPLACE PROCEDURE atualiza_estoque(p_id_pedido INT)
LANGUAGE plpgsql AS $$
DECLARE
    itens_info RECORD;
BEGIN
    FOR itens_info IN
        SELECT ip.isbn_livro, ip.quantidade, e.quantidade_estoque
        FROM (SELECT isbn_livro, quantidade 
              FROM item_pedido 
              WHERE id_pedido = p_id_pedido) ip
        JOIN estoque e ON ip.isbn_livro = e.isbn
    LOOP
        -- Atualiza o estoque
        UPDATE estoque
        SET quantidade_estoque = itens_info.quantidade_estoque - itens_info.quantidade
        WHERE isbn = itens_info.isbn_livro;
    END LOOP;
END;
$$;
