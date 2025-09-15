import { IsNotEmpty } from 'class-validator';

export class CreateEditoraDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  cnpj: string;
}