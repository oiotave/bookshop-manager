import { Module } from '@nestjs/common';
import { EditoraService } from './editora.service';
import { EditoraController } from './editora.controller';

@Module({
  controllers: [EditoraController],
  providers: [EditoraService],
})
export class EditoraModule {}
