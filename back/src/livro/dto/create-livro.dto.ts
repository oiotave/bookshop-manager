import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLivroDto {
  @IsNotEmpty()
  isbn: string;

  @IsNotEmpty()
  titulo: string;

  @IsNotEmpty()
  id_autor: number;

  @IsNotEmpty()
  id_editora: number;

  @IsOptional()
  genero?: string;

  @IsOptional()
  ano_publicacao?: number;

  @IsOptional()
  imagem_capa?: string;

  @IsOptional()
  sinopse?: string;
}