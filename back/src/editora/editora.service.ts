import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EditoraService {
  constructor(private databaseService: DatabaseService) {}
  
  async createEditora(data: any) {
    const { nome, cnpj } = data;
    const values = [nome, cnpj];

    const query = 
        `INSERT INTO editora (nome, cnpj)
         VALUES ($1, $2)
         RETURNING id`

    try { return await this.databaseService.databaseAccess(query, values) }
    
    catch (error) { throw error }
  }

  async findEditora(id: number) {
    const query = `SELECT * FROM editora WHERE id = $1`
    
    try { return await this.databaseService.databaseAccess(query, [id]) }
    
    catch (error) { throw error }
  }

  async findAllEditora() {
    const query = `SELECT * FROM editora`

    try { return await this.databaseService.databaseAccess(query, []) }
    
    catch (error) { throw error }
  }

  async findNameEditora(nome: string) {
    const query = `SELECT * FROM editora WHERE nome = $1`
    
    try { return await this.databaseService.databaseAccess(query, [nome]) }
    
    catch (error) { throw error }
  }

  async updateEditora(id: number, data: any) {
    const fields: string[] = []
    const values: any[] = []

    let index = 1;
    for (const key in data) {
      fields.push(`${key} = $${index}`);
      values.push(data[key]);
      index++;
    }
    if (fields.length === 0) return null;

    const query = `UPDATE editora SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
    values.push(id);
    
    try { return await this.databaseService.databaseAccess(query, values) }
    
    catch (error) { throw error }
  }

  async removeEditora(id: number) {
    const query = `DELETE FROM editora WHERE id = $1 RETURNING id`
    
    try { return await this.databaseService.databaseAccess(query, [id]) }
    
    catch (error) { throw error }
  }
}