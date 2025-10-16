import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAutorDto {
  @IsNotEmpty()
  nome: string;

  @IsOptional()
  nacionalidade?: string;

  @IsOptional()
  data_nascimento?: Date;
}