import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivroModule } from './livro/livro.module';
import { AutorModule } from './autor/autor.module';
import { EditoraModule } from './editora/editora.module';
import { EstoqueModule } from './estoque/estoque.module';
import { DatabaseModule } from './database/database.module';
import { RelatoriosModule } from './relatorios/relatorios.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PedidoModule } from './pedido/pedido.module';
import { ItemPedidoModule } from './item_pedido/item_pedido.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { ValidacaoPagamentoModule } from './validacao_pagamento/validacao_pagamento.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [LivroModule, AutorModule, EditoraModule, EstoqueModule,
    DatabaseModule, RelatoriosModule, UsuarioModule, PedidoModule,
    ItemPedidoModule, PagamentoModule, ValidacaoPagamentoModule, AuthModule
  ],
  controllers: [AppController], providers: [AppService]
})

export class AppModule {}
