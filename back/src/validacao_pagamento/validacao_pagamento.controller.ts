import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ValidacaoPagamentoService } from './validacao_pagamento.service';
import { CreateValidacaoPagamentoDto } from './dto/create-validacao_pagamento.dto';
import { UpdateValidacaoPagamentoDto } from './dto/update-validacao_pagamento.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('validacao-pagamento')
export class ValidacaoPagamentoController {
  constructor(private readonly validacaoPagamentoService: ValidacaoPagamentoService) {}

  @Post('create')
  @ApiBody({ type: [CreateValidacaoPagamentoDto] })
  create(@Body() data: CreateValidacaoPagamentoDto) {
    return this.validacaoPagamentoService.create(data);
  }

  @Get('find/:id_pedido/:id_pagamento')
  findAll(@Param('id_pedido') id_pedido: number, @Param('id_pagamento') id_pagamento: number) {
    return this.validacaoPagamentoService.find(id_pedido, id_pagamento);
  }

  @Get('findPedido/:id_pedido')
  findByPedido(@Param('id_pedido') id_pedido: number) {
    return this.validacaoPagamentoService.findByPedido(id_pedido);
  }

  @Patch('update/:id_pedido/:id_pagamento')
  @ApiBody({ type: [UpdateValidacaoPagamentoDto] })
  update(@Param('id_pedido') id_pedido: number, @Param('id_pagamento') id_pagamento: number, @Body() data: UpdateValidacaoPagamentoDto) {
    return this.validacaoPagamentoService.update(id_pedido, id_pagamento, data);
  }

  @Delete('remove/:id_pedido/:id_pagamento')
  remove(@Param('id_pedido') id_pedido: number, @Param('id_pagamento') id_pagamento: number) {
    return this.validacaoPagamentoService.remove(id_pedido, id_pagamento);
  }
}
