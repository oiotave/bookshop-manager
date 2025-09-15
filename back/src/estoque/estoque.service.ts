import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EstoqueService {
  constructor(private databaseService: DatabaseService) {}
  
  async createEstoque(data: any) {
    const {isbn, edicao, preco_unitario, quantidade_estoque} = data;
    const values = [isbn, edicao, preco_unitario, quantidade_estoque];

    const query = 
        `INSERT INTO estoque (isbn, edicao, preco_unitario, quantidade_estoque)
         VALUES ($1, $2, $3, $4)
         RETURNING *`

    try { return await this.databaseService.databaseAccess(query, values) }
    
    catch (error) { throw error }
  }

  async findEstoque(isbn: string, edicao: number) {
    const query = 
        `SELECT * FROM estoque
         WHERE isbn = $1 AND edicao = $2`
    
    try { return await this.databaseService.databaseAccess(query, [isbn, edicao]) }
    
    catch (error) { throw error }
  }

  async findAllEstoque() {
    const query = `SELECT * FROM estoque`

    try { return await this.databaseService.databaseAccess(query, []) }
    
    catch (error) { throw error }
  }

  async updateEstoque(isbn: string, edicao: number, data: any) {
    const fields: string[] = []
    const values: any[] = []

    let index = 1;
    for (const key in data) {
      fields.push(`${key} = $${index}`);
      values.push(data[key]);
      index++;
    }
    if (fields.length === 0) return null;

    const query = 
        `UPDATE estoque SET ${fields.join(', ')}
         WHERE isbn = $${index++} AND edicao = $${index} RETURNING *`;
     
    values.push(isbn);
    values.push(edicao);
    
    try { return await this.databaseService.databaseAccess(query, values) }

    catch (error) { throw error }
  }

  async removeEstoque(isbn: string, edicao: number) {
    const query = 
        `DELETE FROM estoque
         WHERE isbn = $1 AND edicao = $2 RETURNING *`
    
    try { return await this.databaseService.databaseAccess(query, [isbn, edicao]) }
    
    catch (error) { throw error }
  }
}