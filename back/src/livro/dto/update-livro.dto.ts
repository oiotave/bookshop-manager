import { IsOptional } from 'class-validator';

export class UpdateLivroDto {
  @IsOptional()
  titulo?: string;

  @IsOptional()
  genero?: string;

  @IsOptional()
  id_autor?: number;

  @IsOptional()
  id_editora?: number;

  @IsOptional()
  ano_publicacao?: number;

  @IsOptional()
  imagem_capa?: string;

  @IsOptional()
  sinopse?: string;
}