import { IsOptional } from "class-validator";

export class UpdatePagamentoDto {
    @IsOptional()
    valor?: number;

    @IsOptional()
    forma_pagamento?: string;
}
