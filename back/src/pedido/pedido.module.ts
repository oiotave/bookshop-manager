import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PagamentoModule } from 'src/pagamento/pagamento.module';
import { ValidacaoPagamentoModule } from 'src/validacao_pagamento/validacao_pagamento.module';
import { EstoqueModule } from 'src/estoque/estoque.module';

@Module({ imports: [PagamentoModule, ValidacaoPagamentoModule, EstoqueModule], controllers: [PedidoController],
    providers: [PedidoService], exports: [PedidoService] })

export class PedidoModule {}
