import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivroModule } from './livro/livro.module';
import { AutorModule } from './autor/autor.module';
import { EditoraModule } from './editora/editora.module';
import { EstoqueModule } from './estoque/estoque.module';
import { DatabaseModule } from './database/database.module';
import { RelatoriosModule } from './relatorios/relatorios.module';

@Module({
  imports: [LivroModule, AutorModule, EditoraModule, EstoqueModule, DatabaseModule, RelatoriosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
