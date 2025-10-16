import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdatePedidoDto {
    @IsNotEmpty()
    id_usuario: number;

    @IsOptional()
    quantidade_total?: number;

    @IsOptional()
    situacao_entrega?: string;
}
