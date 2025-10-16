import { IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePedidoDto {
    @IsNotEmpty()
    id_usuario: number;

    @IsNotEmpty()
    quantidade_total: number;

    @IsOptional()
    situacao_entrega?: string;
}
