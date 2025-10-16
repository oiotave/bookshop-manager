import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AutorService } from './autor.service';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';

@Controller('autor')
export class AutorController {
  constructor(private readonly autorService: AutorService) {}

  @Post('create')
  @ApiBody({ type: CreateAutorDto })
  async create(@Body() data: CreateAutorDto) {
    return await this.autorService.create(data);
  }

  @Get('find/:id')
  async findOne(@Param('id') id: number) {
    return await this.autorService.findById(id);
  }

  @Get('findAll')
  async findAll() {
    return await this.autorService.findAll();
  }

  @Get('findName/:nome')
  async findName(@Param('nome') nome: string) {
    return await this.autorService.findByName(nome)
  }
  
  @Patch('update/:id')
  @ApiBody({ type: UpdateAutorDto })
  async update(@Param('id') id: number, @Body() data: UpdateAutorDto) {
    return await this.autorService.update(id, data);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: number) {
    return await this.autorService.remove(id);
  }
}
