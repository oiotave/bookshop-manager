import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post('create')
  @ApiBody({ type: [CreatePedidoDto] })
  async create(@Body() data: CreatePedidoDto) {
    return await this.pedidoService.create(data);
  }

  @Get('find/:id')
  async find(@Param('id') id: number) {
    return await this.pedidoService.find(id);
  }

  @Get('findAll')
  async findAll() {
    return await this.pedidoService.findAll();
  }

  @Get('findByUser/:id')
  async findByUser(@Param('id') id_usuario: number) {
    return await this.pedidoService.findByUser(id_usuario);
  }

  @Patch('updateQuantidade/:id')
  @ApiBody({ type: [UpdatePedidoDto] })
  updateQuantidade(@Param('id') id: number, @Body() data: UpdatePedidoDto) {
    return this.pedidoService.updateQuantidade(id, data);
  }

  @Patch('updateSituacao/:id')
  @ApiBody({ type: [UpdatePedidoDto] })
  updateSituacaoEntrega(@Param('id') id: number, @Body() data: UpdatePedidoDto) {
    return this.pedidoService.updateEntrega(id, data);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: number) {
    return this.pedidoService.remove(id);
  }
}
