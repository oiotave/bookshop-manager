import { IsOptional } from 'class-validator';

export class UpdateUsuarioDto {
    @IsOptional()
    nome?: string;

    @IsOptional()
    senha?: string;

    @IsOptional()
    endereco?: string;
}
