import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class LivroService {
  constructor(private databaseService: DatabaseService) {}
  
  async createLivro(data: any) {
    const {isbn, titulo, genero, ano_publicacao, id_autor, id_editora} = data;
    const values = [isbn, titulo, genero, ano_publicacao, id_autor, id_editora]
    
    const query =         
        `INSERT INTO livro (isbn, titulo, genero, ano_publicacao, id_autor, id_editora)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`
         
    try { return await this.databaseService.databaseAccess(query, values) }
    
    catch (error) { throw error }
  }

  async findLivro(isbn: string) {
    const query = `SELECT * FROM livro WHERE isbn = $1`
    
    try { return await this.databaseService.databaseAccess(query, [isbn]) }
    
    catch (error) { throw error }
  }

  async findAllLivro() {
    const query = `SELECT * FROM livro`
    
    try { return await this.databaseService.databaseAccess(query, []) }
    
    catch (error) { throw error }
  }

  async findNameLivro(nome: string) {
      const query = `SELECT * FROM livro WHERE titulo = $1`

      try { return await this.databaseService.databaseAccess(query, [nome]) }
      
      catch (error) { throw error }
  }

  async updateLivro(isbn: string, data: any) {
    const fields: string[] = []
    const values: any[] = []

    let index = 1;
    for (const key in data) {
      fields.push(`${key} = $${index}`);
      values.push(data[key]);
      index++;
    }
    if (fields.length === 0) return null;

    const query = `UPDATE livro SET ${fields.join(', ')} WHERE isbn = $${index} RETURNING *`;
    values.push(isbn);
    
    try { return await this.databaseService.databaseAccess(query, values) }
    
    catch (error) { throw error }
  }

  async removeLivro(isbn: string) {
    const query = `DELETE FROM livro WHERE isbn = $1 RETURNING *`

    try { return await this.databaseService.databaseAccess(query, [isbn]) }
    
    catch (error) { throw error }
  }
}