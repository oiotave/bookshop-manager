import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('pagamento')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post('create')
  @ApiBody({ type: [CreatePagamentoDto] })
  async create(@Body() data: CreatePagamentoDto) {
    return await this.pagamentoService.create(data);
  }
  
  @Get('find/:id')
  async findOne(@Param('id') id: number) {
    return await this.pagamentoService.find(id);
  }

  @Get('findAll')
  async findAll() {
    return await this.pagamentoService.findAll();
  }

  @Patch('update/:id')
  @ApiBody({ type: [UpdatePagamentoDto] })
  async update(@Param('id') id: number, @Body() data: UpdatePagamentoDto) {
    return await this.pagamentoService.update(id, data);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: number) {
    return await this.pagamentoService.remove(id);
  }
}
