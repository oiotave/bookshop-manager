import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { EditoraService } from './editora.service';
import { CreateEditoraDto } from './dto/create-editora.dto';
import { UpdateEditoraDto } from './dto/update-editora.dto';

@Controller('editora')
export class EditoraController {
  constructor(private readonly EditoraService: EditoraService) {}

  @Post('create')
  @ApiBody({ type: [CreateEditoraDto] })
  async create(@Body() data: CreateEditoraDto) {
    return await this.EditoraService.create(data);
  }

  @Get('find/:id')
  async findOne(@Param('id') id: number) {
    return await this.EditoraService.findById(id);
  }

  @Get('findAll')
  async findAll() {
    return await this.EditoraService.findAll();
  }

  @Get('findName/:nome')
  async findName(@Param('nome') nome: string) {
    return await this.EditoraService.findByName(nome)
  }

  @Patch('update/:id')
  @ApiBody({ type: [UpdateEditoraDto] })
  async update(@Param('id') id: number, @Body() data: UpdateEditoraDto) {
    return await this.EditoraService.update(id, data);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: number) {
    return await this.EditoraService.remove(id);
  }
}