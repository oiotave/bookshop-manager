import { IsNotEmpty } from 'class-validator';

export class UpdateItemPedidoDto {
    @IsNotEmpty()
    id_pedido: number;

    @IsNotEmpty()
    quantidade: number;
}
