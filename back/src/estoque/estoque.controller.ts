import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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
    return await this.estoqueService.create(estoque);
  }

  @Get('find/:isbn')
  async findOne(@Param('isbn') isbn: string) {
    return await this.estoqueService.find(isbn);
  }

  @Get('findAll')
  async findAll() {
    return await this.estoqueService.findAll();
  }

  @Patch('update/:isbn')
  @ApiBody({ type: [UpdateEstoqueDto] })
  async update(@Param('isbn') isbn: string, @Body() updateEstoqueDto: UpdateEstoqueDto) {
    return await this.estoqueService.update(isbn, updateEstoqueDto);
  }

  @Delete('remove/:isbn')
  async remove(@Param('isbn') isbn: string) {
    return await this.estoqueService.remove(isbn);
  }
}
