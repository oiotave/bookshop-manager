import { IsOptional } from 'class-validator';

export class UpdateEstoqueDto {
  @IsOptional()
  preco_unitario?: number;

  @IsOptional()
  quantidade_estoque?: number;
}