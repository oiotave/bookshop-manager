import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { LivroService } from './livro.service';
import { CreateLivroDto } from './dto/create-livro.dto';
import { UpdateLivroDto } from './dto/update-livro.dto';

@Controller('livro')
export class LivroController {
  constructor(private readonly LivroService: LivroService) {}

  @Post('create')
  @ApiBody({ type: [CreateLivroDto] })
  async create(@Body() data: CreateLivroDto) {
    return await this.LivroService.createLivro(data);
  }

  @Get('find/:isbn')
  async find(@Param('isbn') isbn: string) {
    return await this.LivroService.findLivro(isbn);
  }

  @Get('findAll')
  async findAll() {
    return await this.LivroService.findAllLivro();
  }

  @Get('findName/:nome')
  async findName(@Param('nome') nome: string) {
    return await this.LivroService.findNameLivro(nome)
  }

  @Patch('update/:isbn')
  @ApiBody({ type: [UpdateLivroDto] })
  async update(@Param('isbn') isbn: string, @Body() data: UpdateLivroDto) {
    return await this.LivroService.updateLivro(isbn, data);
  }

  @Delete('remove/:isbn')
  async remove(@Param('isbn') isbn: string) {
    return await this.LivroService.removeLivro(isbn);
  }
}
