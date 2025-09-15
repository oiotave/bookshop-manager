import { IsOptional } from 'class-validator';

export class UpdateAutorDto {
  @IsOptional()
  nome?: string;

  @IsOptional()
  nacionalidade?: string;

  @IsOptional()
  data_nascimento?: Date;
}