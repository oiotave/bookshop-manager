import { IsNotEmpty, IsOptional } from "class-validator";

export class CreatePagamentoDto {
    @IsNotEmpty()
    valor: number;

    @IsOptional()
    forma_pagamento?: string;
}
