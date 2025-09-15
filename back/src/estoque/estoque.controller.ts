import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { EstoqueService } from './estoque.service';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { UpdateEstoqueDto } from './dto/update-estoque.dto';

@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Post('create')
  @ApiBody({ type: [CreateEstoqueDto] })
  async create(@Body() estoque: CreateEstoqueDto) {
    return await this.estoqueService.createEstoque(estoque);
  }

  @Get('find/:isbn/:edicao')
  async find(@Param('isbn') isbn: string, @Param('edicao') edicao: number) {
    return await this.estoqueService.findEstoque(isbn, edicao);
  }

  @Get('findAll')
  async findAll() {
    return await this.estoqueService.findAllEstoque();
  }

  @Patch('update/:isbn/:edicao')
  @ApiBody({ type: [UpdateEstoqueDto] })
  async update(@Param('isbn') isbn: string, @Param('edicao') edicao: number, @Body() updateEstoqueDto: UpdateEstoqueDto) {
    return await this.estoqueService.updateEstoque(isbn, edicao, updateEstoqueDto);
  }

  @Delete('remove/:isbn/:edicao')
  async remove(@Param('isbn') isbn: string, @Param('edicao') edicao: number) {
    return await this.estoqueService.removeEstoque(isbn, edicao);
  }
}
