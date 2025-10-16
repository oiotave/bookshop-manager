import { Module } from '@nestjs/common';
import { ValidacaoPagamentoService } from './validacao_pagamento.service';
import { ValidacaoPagamentoController } from './validacao_pagamento.controller';

@Module({ controllers: [ValidacaoPagamentoController], providers: [ValidacaoPagamentoService], exports: [ValidacaoPagamentoService] })

export class ValidacaoPagamentoModule {}
