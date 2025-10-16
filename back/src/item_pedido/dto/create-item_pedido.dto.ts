import { IsNotEmpty } from 'class-validator';

export class CreateItemPedidoDto {
    @IsNotEmpty()
    id_pedido: number;

    @IsNotEmpty()
    isbn_livro: string;

    @IsNotEmpty()
    quantidade: number;
}
