import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';


@Injectable()
export class UsuarioService {
  constructor(private databaseService: DatabaseService) {}
  
  async create(data: any) {
    const { nome, cpf, email, senha, endereco, funcao } = data;

    const query1 = `
      INSERT INTO usuario (nome, cpf, email, senha, endereco, funcao)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
  
    const query2 = `
      INSERT INTO usuario (nome, cpf, email, senha, endereco)
      VALUES ($1, $2, $3, $4, $5) RETURNING id`;

    try { 
      if (funcao) { 
          const values = [nome, cpf, email, senha, endereco, funcao];
          return await this.databaseService.databaseAccess(query1, values);
      }
      else {
        const values = [nome, cpf, email, senha, endereco];
        return await this.databaseService.databaseAccess(query2, values);
      }
    }
    catch (error) { throw new InternalServerErrorException(`Erro ao cadastrar usuário: ${error.message}`) }  
  }

  async find(id: number) {
    const query = `SELECT * FROM usuario WHERE id = $1`;

    try { return await this.databaseService.databaseAccess(query, [id]) }

    catch (error) { throw new InternalServerErrorException(`Erro ao buscar usuário: ${error.message}`) }  
  }

  async findAll() {
    const query = `SELECT * FROM usuario`;

    try { return await this.databaseService.databaseAccess(query, []) }

    catch (error) { throw new InternalServerErrorException(`Erro ao buscar usuários: ${error.message}`) }  
  }

  async findByName(nome: string) {
    const query = `SELECT * FROM usuario WHERE unaccent(LOWER(nome)) = unaccent(LOWER($1))`;

    try { return await this.databaseService.databaseAccess(query, [nome]) }

    catch (error) { throw new InternalServerErrorException(`Erro ao buscar usuário: ${error.message}`) }  
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

    const query = `UPDATE usuario SET ${fields.join(', ')} WHERE id = $${index} RETURNING id`;
    values.push(id);
    
    try { return await this.databaseService.databaseAccess(query, values) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao atualizar usuário: ${error.message}`) }  
  }

  async remove(id: number) {
    const query = `DELETE FROM usuario WHERE id = $1 RETURNING id`;

    try { return await this.databaseService.databaseAccess(query, [id]) }

    catch (error) { throw new InternalServerErrorException(`Erro ao remover usuário: ${error.message}`) }  
  }
}
