import { Module } from '@nestjs/common';
import { ItemPedidoService } from './item_pedido.service';
import { ItemPedidoController } from './item_pedido.controller';
import { PedidoModule } from 'src/pedido/pedido.module';
import { PagamentoModule } from 'src/pagamento/pagamento.module';
import { ValidacaoPagamentoModule } from 'src/validacao_pagamento/validacao_pagamento.module';

@Module({ imports: [PedidoModule, PagamentoModule, ValidacaoPagamentoModule],
    controllers: [ItemPedidoController], providers: [ItemPedidoService] })

export class ItemPedidoModule {}
