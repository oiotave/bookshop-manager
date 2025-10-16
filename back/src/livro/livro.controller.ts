import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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
    return await this.LivroService.create(data);
  }

  @Get('find/:isbn')
  async find(@Param('isbn') isbn: string) {
    return await this.LivroService.find(isbn);
  }

  @Get('findAll')
  async findAll() {
    return await this.LivroService.findAll();
  }

  @Get('findAllInfo')
  async findInfo() {
    return await this.LivroService.findAllByInfo();
  }

  @Get('findOther/:isbn')
  async findOther(@Param('isbn') isbn: string) {
    return await this.LivroService.findOtherInfo(isbn);
  }

  @Get('findName/:nome')
  async findName(@Param('nome') nome: string) {
    return await this.LivroService.findByName(nome);
  }

  @Get('findGenero/:genero')
  async findGenre(@Param('genero') genero: string) {
    return await this.LivroService.findByGenre(genero);
  }

  @Get('findNacionalidade/:nacionalidade')
  async findNacionality(@Param('nacionalidade') nacionalidade: string) {
    return await this.LivroService.findByNacionality(nacionalidade);
  }

  @Get('findAno/:ano_lancamento')
  async findYear(@Param('ano_lancamento') ano_lancamento: number) {
    return await this.LivroService.findByYear(ano_lancamento);
  }

  @Get('findPreco/:preco')
  async findPrice(@Param('preco') preco: number) {
    return await this.LivroService.findByPrice(preco);
  }

  @Patch('update/:isbn')
  @ApiBody({ type: [UpdateLivroDto] })
  async update(@Param('isbn') isbn: string, @Body() data: UpdateLivroDto) {
    return await this.LivroService.update(isbn, data);
  }

  @Delete('remove/:isbn')
  async remove(@Param('isbn') isbn: string) {
    return await this.LivroService.remove(isbn);
  }
}
