import { Controller, Get } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';

@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}
  
  @Get('estoque')
  async relatorioEstoque() {
    return await this.relatoriosService.relatorioEstoque();
  }

  @Get('autores')
  async relatorioAutor() {
    return await this.relatoriosService.relatorioAutores();
  }

  @Get('editoras')
  async relatorioEditora() {
    return await this.relatoriosService.relatorioEditoras();
  }

  @Get('precos')
  async relatorioPreco() {
    return await this.relatoriosService.relatorioPrecos();
  }

  @Get('genero')
  async relatorioGeneroLivro() {
    return await this.relatoriosService.relatorioGeneroLivros();
  }

  @Get('vendas')
  async relatorioVendas() {
    return await this.relatoriosService.relatorioVendas();
  }
}
