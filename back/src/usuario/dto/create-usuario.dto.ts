import { IsOptional, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    cpf: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    senha: string;

    @IsOptional()
    endereco?: string;

    @IsOptional()
    funcao?: string;
}
