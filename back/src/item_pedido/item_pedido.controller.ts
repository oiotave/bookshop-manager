import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemPedidoService } from './item_pedido.service';
import { CreateItemPedidoDto } from './dto/create-item_pedido.dto';
import { UpdateItemPedidoDto } from './dto/update-item_pedido.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('item-pedido')
export class ItemPedidoController {
  constructor(private readonly itemPedidoService: ItemPedidoService) {}

  @Post('create/:id_usuario')
  @ApiBody({ type: [CreateItemPedidoDto] })
  async create(@Body() data: CreateItemPedidoDto, @Param('id_usuario') id_usuario: number) {
    return await this.itemPedidoService.add(data, id_usuario);
  }

  @Get('find/:id_pedido/:isbn_livro')
  async findOne(@Param('id_pedido') id_pedido: number, @Param('isbn_livro') isbn_livro: string) {
    return await this.itemPedidoService.find(id_pedido, isbn_livro);
  }

  @Get('find/:id_pedido')
  async findByPedido(@Param('id_pedido') id_pedido: number) {
    return await this.itemPedidoService.findByPedido(id_pedido);
  }

  @Get('findPreco/:id_pedido/:isbn_livro')
  async findPreco(@Param('id_pedido') id_pedido: number, @Param('isbn_livro') isbn_livro: string) {
    return await this.itemPedidoService.findPrice(id_pedido, isbn_livro);
  }

  @Patch('update/:id_usuario/:id_pedido/:isbn_livro')
  @ApiBody({ type: [UpdateItemPedidoDto] })
  async update(data: UpdateItemPedidoDto, @Param('id_usuario') id_usuario: number) {
    return await this.itemPedidoService.update(data, id_usuario);
  }

  @Delete('remove/:id_usuario/:id_pedido/:isbn_livro')
  async remove(@Param('id_usuario') id_usuario: number, @Param('id_pedido') id_pedido: number, @Param('isbn_livro') isbn_livro: string) {
    return this.itemPedidoService.remove(id_usuario, id_pedido, isbn_livro);
  }
}
