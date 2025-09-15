import { IsNotEmpty } from 'class-validator';

export class CreateEstoqueDto {
  @IsNotEmpty()
  isbn: string;

  @IsNotEmpty()
  edicao: number;

  @IsNotEmpty()
  preco_unitario: number;

  @IsNotEmpty()
  quantidade_estoque: number;
}