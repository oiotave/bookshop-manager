import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { PagamentoService } from 'src/pagamento/pagamento.service';
import { PedidoService } from 'src/pedido/pedido.service';
import { ValidacaoPagamentoService } from 'src/validacao_pagamento/validacao_pagamento.service';

@Injectable()
export class ItemPedidoService {
  constructor(private databaseService: DatabaseService, private pedidoService: PedidoService,
    private pagamentoService: PagamentoService, private validacaoService: ValidacaoPagamentoService) {}
  
  /**
   * Calcula a quantidade de produtos em um pedido
   * 
   * @param id_pedido Identificador do pedido
   * @returns A quantidade de produtos no pedido
   */
  async countQuantidade(id_pedido: number) {
    const query = `SELECT SUM(quantidade) AS quantidades FROM item_pedido WHERE id_pedido = $1`;

    try {
      const res = await this.databaseService.databaseAccess(query, [id_pedido]);
      return res[0].quantidades;
    }
    catch (error) { throw new InternalServerErrorException(`Erro ao calcular quantidades: ${error.message}`) }
  }

  /**
   * Calcula o preço total de um item no pedido
   * 
   * @param id_pedido Identificador do pedido
   * @param isbn_livro Identificador do livro
   * @returns O preço total do item
   */
  async findPrice(id_pedido: number, isbn_livro: string) {
    const query = `SELECT * FROM preco_itens WHERE id_pedido = $1 AND isbn_livro = $2`;

    try {
      const res = await this.databaseService.databaseAccess(query, [id_pedido, isbn_livro]);
      return res[0].preco;
    }
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar preço dos itens: ${error.message}`) }
  }

  async add(data: any, id_user: number) {
    const values = [data.isbn_livro, data.quantidade];

    const query = `
      INSERT INTO item_pedido (isbn_livro, quantidade, id_pedido)
      VALUES ($1, $2, $3) RETURNING *`;
    
    try {
      if (data.id_pedido === -1) {
        // Se o item é adicionado a um pedido novo, cria o pedido primeiro e guarda o ID
        const res_pedido = await this.pedidoService.create({ id_usuario: id_user, quantidade_total: 0 });
        values.push(res_pedido[0].id);
      }
      else { values.push(data.id_pedido) }
      
      const res = await this.databaseService.databaseAccess(query, values); // Adiciona o item
      const qtd = await this.countQuantidade(values[values.length - 1]);

      // Atualiza a quantidade de itens no pedido
      await this.pedidoService.updateQuantidade(values[values.length - 1], { id_usuario: id_user, quantidade_total: qtd });

      return res;
    }
    catch (error) { throw new InternalServerErrorException(`Erro ao adicionar item: ${error.message}`) }
  }

  async findByPedido(id_pedido: number) {
    const query = `SELECT * FROM info_itens WHERE id_pedido = $1`;

    try {
      const res = await this.databaseService.databaseAccess(query, [id_pedido]);
      
      for (const item of res) { item.valor = await this.findPrice(id_pedido, item.isbn_livro) }
      console.log(res)
      return res;
    }
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar itens no pedido ${id_pedido}`) }
  }

  async find(id_pedido: number, isbn_livro: string) {
    const query = `SELECT * FROM item_pedido WHERE id_pedido = $1 AND isbn_livro = $2`;

    try { return await this.databaseService.databaseAccess(query, [id_pedido, isbn_livro]) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar item no pedido ${id_pedido}`) }
  }

  async update(data: any, id_usuario: number) {
    const values = [data.quantidade, data.id_pedido, data.isbn_livro];

    const query = `UPDATE item_pedido SET quantidade = $1 WHERE id_pedido = $2 AND isbn_livro = $3`;

    try {
      const res = await this.databaseService.databaseAccess(query, values);
      const qtd = await this.countQuantidade(data.id_pedido);
      
      // Atualiza a quantidade de itens no pedido
      await this.pedidoService.updateQuantidade(data.id_pedido, { id_usuario: id_usuario, quantidade_total: qtd});
      
      return res;
    }
    catch (error) { throw new InternalServerErrorException(`Erro ao atualizar item: ${error.message}`) }
  }

  async remove(id_usuario: number, id_pedido: number, isbn_livro: string) {
    const query = `DELETE FROM item_pedido WHERE id_pedido = $1 AND isbn_livro = $2`;
    const query_remocao = `CALL remocao_pedido($1)`
    try {
      const res = await this.databaseService.databaseAccess(query, [id_pedido, isbn_livro]);
      const qtd = await this.countQuantidade(id_pedido);
      
      // Se o item removido era o único no pedido, exclui o pedido também
      if (qtd === null) { await this.databaseService.databaseAccess(query_remocao, [id_pedido]) }
      
      // Senão, apenas atualiza a quantidade de itens no pedido
      else { await this.pedidoService.updateQuantidade(id_pedido, { id_usuario: id_usuario, quantidade_total: qtd }) }

      return res;
    }
    catch (error) { throw new InternalServerErrorException(`Erro ao remover item: ${error.message}`) }
  }
}
