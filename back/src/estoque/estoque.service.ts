import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EstoqueService {
  constructor(private databaseService: DatabaseService) {}
  
  async create(data: any) {
    const { isbn, preco_unitario, quantidade_estoque } = data;
    const values = [isbn, preco_unitario, quantidade_estoque];

    const query = `
      INSERT INTO estoque (isbn, preco_unitario, quantidade_estoque)
      VALUES ($1, $2, $3) RETURNING isbn`;

    try { return await this.databaseService.databaseAccess(query, values) }
    
    catch (error) {
      if (error.code === '23503') { throw new BadRequestException(`O livro com o ISBN ${isbn} não existe`) }
      
      throw new InternalServerErrorException(`Erro ao cadastrar estoque: ${error.message}`)
    }
  }

  async findAll() {
    const query = `SELECT * FROM estoque`;

    try { return await this.databaseService.databaseAccess(query, []) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar estoques: ${error.message}`) }
  }

  async find(isbn: string) {
    const query = `SELECT * FROM estoque WHERE isbn = $1`;
    
    try { return await this.databaseService.databaseAccess(query, [isbn]) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar estoque: ${error.message}`) }
  }

  async update(isbn: string, data: any) {
    const fields: string[] = [];
    const values: any[] = [];

    let index = 1;
    for (const key in data) {
      fields.push(`${key} = $${index}`);
      values.push(data[key]);
      index++;
    }
    if (fields.length === 0) return null;

    const query = `UPDATE estoque SET ${fields.join(', ')} WHERE isbn = $${index++} RETURNING isbn`;
    values.push(isbn);
    
    try { return await this.databaseService.databaseAccess(query, values) }

    catch (error) { throw new InternalServerErrorException(`Erro ao atualizar estoque: ${error.message}`) }
  }

  async remove(isbn: string) {
    const query = `DELETE FROM estoque WHERE isbn = $1 RETURNING isbn`;
    
    try { return await this.databaseService.databaseAccess(query, [isbn]) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao remove estoque: ${error.message}`) }
  }
}