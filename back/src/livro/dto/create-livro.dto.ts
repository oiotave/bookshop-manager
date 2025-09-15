import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLivroDto {
  @IsNotEmpty()
  isbn: string;

  @IsNotEmpty()
  titulo: string;

  @IsOptional()
  genero?: string;

  @IsNotEmpty()
  id_autor: number;

  @IsNotEmpty()
  id_editora: number;

  @IsNotEmpty()
  ano_publicacao: number;
}