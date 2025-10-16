import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ValidacaoPagamentoService {
  constructor(private databaseService: DatabaseService) {}
  
  async create(data: any) {
    const { id_pedido, id_pagamento, confirmacao } = data;
    const values = [id_pedido, id_pagamento, confirmacao];

    const query = `
      INSERT INTO validacao_pagamento (id_pedido, id_pagamento, confirmacao)
      VALUES ($1, $2, $3) RETURNING *`;
    
    try { return await this.databaseService.databaseAccess(query, values) }

    catch (error) { throw new InternalServerErrorException(`Erro ao cadastrar validação: ${error.message}`) }
  }

  async find(id_pedido: number, id_pagamento: number) {
    const query = `
      SELECT * FROM validacao_pagamento
      WHERE id_pedido = $1 AND id_pagamento = $2`;
    
    try { return await this.databaseService.databaseAccess(query, [id_pedido, id_pagamento]) }

    catch (error) { throw new InternalServerErrorException(`Erro ao buscar validação: ${error.message}`) }
  }

  async findByPedido(id_pedido: number) {
    const query = `
      SELECT * FROM validacao_pagamento
      WHERE id_pedido = $1 AND confirmacao = false`;

    try { return await this.databaseService.databaseAccess(query, [id_pedido]) }

    catch (error) { throw new InternalServerErrorException(`Erro ao buscar validação: ${error.message}`) }
  }

  async update(id_pedido: number, id_pagamento: number, data: any) {
    const confirmacao = data.confirmacao;
    const values = [confirmacao, id_pedido, id_pagamento];
    
    const query = `
      UPDATE validacao_pagamento SET confirmacao = $1
      WHERE id_pedido = $2 AND id_pagamento = $3 RETURNING *`;

    try { return await this.databaseService.databaseAccess(query, values) }

    catch (error) { throw new InternalServerErrorException(`Erro ao atualizar validação: ${error.message}`) }
  }

  async remove(id_pedido: number, id_pagamento: number) {
    const query = `
      DELETE FROM validacao_pagamento
      WHERE id_pedido = $1 AND id_pagamento = $2 RETURNING *`;

    try { return await this.databaseService.databaseAccess(query, [id_pedido, id_pagamento]) }

    catch (error) { throw new InternalServerErrorException(`Erro ao remover validação: ${error.message}`) }
  }
}
