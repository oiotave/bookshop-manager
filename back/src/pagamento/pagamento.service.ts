import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PagamentoService {
  constructor(private databaseService: DatabaseService) {}

  async create(data: any) {
    const { valor, forma_pagamento } = data;
    const values = [valor, forma_pagamento];

    const query = `
      INSERT INTO pagamento (valor, forma_pagamento)
      VALUES ($1, $2) RETURNING id`;

    try { return await this.databaseService.databaseAccess(query, values) }

    catch (error) { throw new InternalServerErrorException(`Erro ao cadastrar pagamento: ${error.message}`) }  
  }

  async find(id: number) {
    const query = `SELECT * FROM pagamento WHERE id = $1`;

    try { return await this.databaseService.databaseAccess(query, [id]) }

    catch (error) { throw new InternalServerErrorException(`Erro ao buscar pagamento: ${error.message}`) }  
  }

  async findAll() {
    const query = `SELECT * FROM pagamento`;

    try { return await this.databaseService.databaseAccess(query, []) }

    catch (error) { throw new InternalServerErrorException(`Erro ao buscar pagamentos: ${error.message}`) }  
  }

  async update(id: number, data: any) {
    const fields: string[] = [];
    const values: any[] = [];

    let index = 1;
    for (const key in data) {
      fields.push(`${key} = $${index}`);
      values.push(data[key]);
      index++;
    }
    if (fields.length === 0) return null;

    const query = `UPDATE pagamento SET ${fields.join(', ')} WHERE id = $${index} RETURNING id`;
    values.push(id);
    
    try { return await this.databaseService.databaseAccess(query, values) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao atualizar pagamento: ${error.message}`) }  
  }

  async remove(id: number) {
    const query = `DELETE FROM pagamento WHERE id = $1 RETURNING id`;

    try { return await this.databaseService.databaseAccess(query, [id]) }

    catch (error) { throw new InternalServerErrorException(`Erro ao remover pagamento: ${error.message}`) }  
  }
}
