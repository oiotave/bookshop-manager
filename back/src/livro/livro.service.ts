import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class LivroService {
  constructor(private databaseService: DatabaseService) {}
  
  async create(data: any) {
    const { isbn, titulo, genero, ano_publicacao, id_autor, id_editora, capa, sinopse } = data;
    const values = [isbn, titulo, genero, ano_publicacao, id_autor, id_editora, capa, sinopse];
    
    const query = `
      INSERT INTO livro (isbn, titulo, genero, ano_publicacao, id_autor, id_editora, imagem_capa, sinopse)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING isbn`;
         
    try { return await this.databaseService.databaseAccess(query, values) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao cadastrar livro: ${error.message}`) }
  }

  async findAll() {
    const query = `SELECT * FROM livro`;

    try { return await this.databaseService.databaseAccess(query, []) }

    catch (error) { throw new InternalServerErrorException(`Erro ao buscar livros: ${error.message}`) }
  }

  async findAllByInfo() {
    const query = `SELECT * FROM info_livro`;
    
    try { return await this.databaseService.databaseAccess(query, []) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar livros: ${error.message}`) }
  }

  async findOtherInfo(isbn: string) {
    const query = `SELECT * FROM other_info_livro WHERE isbn = $1`;
    
    try { return await this.databaseService.databaseAccess(query, [isbn]) }
  
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar livros: ${error.message}`) }
  }

  async find(isbn: string) {
    const query = `SELECT * FROM livro WHERE isbn = $1`;
    
    try { return await this.databaseService.databaseAccess(query, [isbn]) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar livro: ${error.message}`) }
  }

  async findByGenre(genero: string) {
    const query = `SELECT * FROM filtro_livro WHERE unaccent(LOWER(genero)) = unaccent(LOWER($1))`;

    try { return await this.databaseService.databaseAccess(query, [genero]) }
      
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar livro por gênero: ${error.message}`) }
  }

  async findByNacionality(nacionalidade: string) {
    const query = `SELECT * FROM filtro_livro WHERE unaccent(LOWER(nacionalidade)) = unaccent(LOWER($1))`;

    try { return await this.databaseService.databaseAccess(query, [nacionalidade]) }
      
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar livro por gênero: ${error.message}`) }
  }

  async findByYear(ano_lancamento: number) {
    const query = `SELECT * FROM filtro_livro WHERE ano_publicacao = $1`;

    try { return await this.databaseService.databaseAccess(query, [ano_lancamento]) }
      
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar livro por gênero: ${error.message}`) }
  }

  async findByName(nome: string) {
    const query = `SELECT * FROM filtro_livro WHERE unaccent(LOWER(titulo)) = unaccent(LOWER($1))`;

    try { return await this.databaseService.databaseAccess(query, [nome]) }
      
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar livro por nome: ${error.message}`) }
  }

  async findByPrice(preco: number) {
    const query = `SELECT * FROM filtro_livro WHERE preco < $1`;

    try { return await this.databaseService.databaseAccess(query, [preco]) }
      
    catch (error) { throw new InternalServerErrorException(`Erro ao buscar livro por nome: ${error.message}`) }    
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

    const query = `UPDATE livro SET ${fields.join(', ')} WHERE isbn = $${index} RETURNING isbn`;
    values.push(isbn);
    
    try { return await this.databaseService.databaseAccess(query, values) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao atualizar livro: ${error.message}`) }
  }

  async remove(isbn: string) {
    const query = `DELETE FROM livro WHERE isbn = $1 RETURNING isbn`;

    try { return await this.databaseService.databaseAccess(query, [isbn]) }
    
    catch (error) { throw new InternalServerErrorException(`Erro ao remover livro: ${error.message}`) }
  }
}