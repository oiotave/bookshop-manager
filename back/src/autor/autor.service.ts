import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AutorService {
  constructor(private databaseService: DatabaseService) {}
  
  async create(data: any) {
    const { nome, nacionalidade, data_nascimento } = data;
    const values = [nome, nacionalidade, data_nascimento];

    const query = `
      INSERT INTO autor (nome, nacionalidade, data_nascimento)
      VALUES ($1, $2, $3) RETURNING id`;
    
    try { return await this.databaseService.databaseAccess(query, values) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao cadastrar autor: ${error.message}`) }  
  }

  async findAll() {
    const query = `SELECT * FROM autor`;

    try { return await this.databaseService.databaseAccess(query, []) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar autores: ${error.message}`) }
  }

  async findByName(nome: string) {
    const query = `SELECT * FROM autor WHERE unaccent(LOWER(nome)) = unaccent(LOWER($1))`;

    try { return await this.databaseService.databaseAccess(query, [nome]) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar autor: ${error.message}`) }
  }
  
  async findById(id: number) {
    const query = `SELECT * FROM autor WHERE id = $1`;

    try { return await this.databaseService.databaseAccess(query, [id]) }

    catch (error) { throw new InternalServerErrorException(`Erro ao buscar autores: ${error.message}`) }
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

    const query = `UPDATE autor SET ${fields.join(', ')} WHERE id = $${index} RETURNING id`;
    values.push(id);
    
    try { return await this.databaseService.databaseAccess(query, values) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao atualizar autor: ${error.message}`) }
  }

  async remove(id: number) {
    const query = `DELETE FROM autor WHERE id = $1 RETURNING id`;
    
    try { return await this.databaseService.databaseAccess(query, [id]) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao remover autor: ${error.message}`) }
  }
}