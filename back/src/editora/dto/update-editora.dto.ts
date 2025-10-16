import { IsOptional } from 'class-validator';

export class UpdateEditoraDto {
  @IsOptional()
  nome?: string;

  @IsOptional()
  cnpj?: string;
}