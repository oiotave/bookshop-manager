import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { PagamentoService } from 'src/pagamento/pagamento.service';
import { ValidacaoPagamentoService } from 'src/validacao_pagamento/validacao_pagamento.service';
import { EstoqueService } from 'src/estoque/estoque.service';

@Injectable()
export class PedidoService {
  constructor(private databaseService: DatabaseService, private pagamentoService: PagamentoService,
    private validacaoService: ValidacaoPagamentoService, private estoqueService: EstoqueService) {}
  
  async create(data: any) {
    const { id_usuario, quantidade_total } = data;
    const values = [id_usuario, quantidade_total];

    const query = `
      INSERT INTO pedido (id_usuario, quantidade_total)
      VALUES ($1, $2) RETURNING id`;
  
    try {
      const res = await this.databaseService.databaseAccess(query, values);
      const id_pedido = res[0].id;

      // Cria o pagamento e a validação associada ao pedido
      const res_pagamento = await this.pagamentoService.create({ valor: 0.0, forma_pagamento: null });

      const id_pagamento = res_pagamento[0].id;
      await this.validacaoService.create({ id_pedido: id_pedido, id_pagamento: id_pagamento, confirmacao: false });

      return res;
    }
    catch (error) { throw new InternalServerErrorException(`Erro ao criar pedido: ${error.message}`) }
  }

  /**
   * Calcula o valor total em dinheiro do pedido
   * 
   * @param id_pedido Identificador do pedido
   * @returns Valor a ser pago no pedido
   */
  async calculateValor(id_pedido: number) {
    const query = `
      SELECT SUM(precos.quantidade * precos.preco_unitario) AS total
      FROM (SELECT isbn_livro, quantidade, preco_unitario FROM item_pedido
      JOIN estoque ON item_pedido.isbn_livro = estoque.isbn
      WHERE item_pedido.id_pedido = $1) AS precos`;

    try {
      const res = await this.databaseService.databaseAccess(query, [id_pedido]);
      const valor: number = res[0].total;

      return valor;
    }
    catch (error) { throw new InternalServerErrorException('Erro ao calcular valor do pagamento') }
  }

  async find(id: number) {
    const query = `SELECT * FROM pedido WHERE id = $1`;

    try { return await this.databaseService.databaseAccess(query, [id]) }

    catch (error) { throw new InternalServerErrorException(`Erro ao buscar pedido: ${error.message}`) }
  }

  async findAll() {
    const query = `SELECT pedido.data_compra, pedido.quantidade_total, pedido.situacao_entrega FROM pedido`;

    try { return await this.databaseService.databaseAccess(query, []) }

    catch (error) { throw new InternalServerErrorException(`Erro ao buscar pedidos: ${error.message}`) }
  }

  async findByUser(id_usuario: number) {
    const query = `
      SELECT tabelas.data_compra, tabelas.situacao_entrega, tabelas.valor, tabelas.id_pedido
      FROM (SELECT * FROM validacao_pagamento 
      JOIN pedido ON validacao_pagamento.id_pedido = pedido.id
      JOIN pagamento ON validacao_pagamento.id_pagamento = pagamento.id) AS tabelas
      WHERE id_usuario = $1`

    try { return await this.databaseService.databaseAccess(query, [id_usuario]) }

    catch (error) { throw new InternalServerErrorException(`Erro ao buscar pedido de usuário ${id_usuario}`) }
  }

  async updateQuantidade(id: number, data: any) {
    const quantidade = data.quantidade_total;

    const query = `UPDATE pedido SET quantidade_total = $1 WHERE id = $2 RETURNING id`;
    const query_pagamento = `SELECT id_pagamento FROM validacao_pagamento WHERE id_pedido = $1`;
    
    try {
      const res = await this.databaseService.databaseAccess(query, [quantidade, id]);
      const valor = await this.calculateValor(id);

      // Encontra o pagamento associado e atualiza o valor a ser pago
      const res_pagamento = await this.databaseService.databaseAccess(query_pagamento, [id]);
      await this.pagamentoService.update(res_pagamento[0].id_pagamento, { valor: valor })

      return res;
    }
    catch (error) { throw new InternalServerErrorException(`Erro ao atualizar pedido: ${error.message}`) }
  }

  async updateEntrega(id: number, data: any) {
    const situacao_entrega = data.situacao_entrega;

    const query_produtos = `CALL atualiza_estoque($1)`;

    // Quando o pedido for confirmado, atualiza informações do estoque
    if (situacao_entrega === 'confirmado') { await this.databaseService.databaseAccess(query_produtos, [id]) }
    
    const query = `UPDATE pedido SET situacao_entrega = $1 WHERE id = $2 RETURNING id`;

    try { return await this.databaseService.databaseAccess(query, [situacao_entrega, id]) }

    catch (error) { throw new InternalServerErrorException(`Erro ao atualizar pedido: ${error.message}`) }
  }

  async remove(id: number) {
    const query = `CALL remocao_pedido($1)`;

    try { return await this.databaseService.databaseAccess(query, [id]) }

    catch (error) { throw new InternalServerErrorException(`Erro ao remover pedido: ${error.message}`) }
  }
}
