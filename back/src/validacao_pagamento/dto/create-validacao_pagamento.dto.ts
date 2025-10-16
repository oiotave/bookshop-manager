import { IsNotEmpty } from "class-validator";

export class CreateValidacaoPagamentoDto {
    @IsNotEmpty()
    id_pedido: number;
    
    @IsNotEmpty()
    id_pagamento: number;

    @IsNotEmpty()
    confirmacao: boolean;
}
