import { IsNotEmpty } from "class-validator";

export class UpdateValidacaoPagamentoDto {
    @IsNotEmpty()
    confirmacao: boolean;
}
