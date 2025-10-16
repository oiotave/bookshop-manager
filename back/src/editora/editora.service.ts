import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EditoraService {
  constructor(private databaseService: DatabaseService) {}
  
  async create(data: any) {
    const { nome, cnpj } = data;
    const values = [nome, cnpj];

    const query = `
      INSERT INTO editora (nome, cnpj)
      VALUES ($1, $2) RETURNING id`;

    try { return await this.databaseService.databaseAccess(query, values) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao cadastrar editora: ${error.message}`) }
  }

  async findAll() {
    const query = `SELECT * FROM editora`;

    try { return await this.databaseService.databaseAccess(query, []) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar editoras: ${error.message}`) }
  }

  async findById(id: number) {
    const query = `SELECT * FROM editora WHERE id = $1`;
    
    try { return await this.databaseService.databaseAccess(query, [id]) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar editora: ${error.message}`) }
  }

  async findByName(nome: string) {
    const query = `SELECT * FROM editora WHERE unaccet(LOWER(nome)) = unaccent(LOWER($1))`;
    
    try { return await this.databaseService.databaseAccess(query, [nome]) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar editora: ${error.message}`) }
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

    const query = `UPDATE editora SET ${fields.join(', ')} WHERE id = $${index} RETURNING id`;
    values.push(id);
    
    try { return await this.databaseService.databaseAccess(query, values) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao atualizar editora: ${error.message}`) }
  }

  async remove(id: number) {
    const query = `DELETE FROM editora WHERE id = $1 RETURNING id`;
    
    try { return await this.databaseService.databaseAccess(query, [id]) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao remover editora: ${error.message}`) }
  }
}