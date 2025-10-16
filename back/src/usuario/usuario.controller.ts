import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('create')
  @ApiBody({ type: [CreateUsuarioDto] })
  async create(@Body() data: CreateUsuarioDto) {
    return await this.usuarioService.create(data);
  }

  @Get('find/:id')
  async find(@Param('id') id: number) {
    return await this.usuarioService.find(id);
  }

  @Get('findAll')
  async findAll() {
    return await this.usuarioService.findAll();
  }

  @Get('findName/:nome')
  findName(@Param('nome') nome: string) {
    return this.usuarioService.findByName(nome);
  }

  @Patch('update/:id')
  @ApiBody({ type: [UpdateUsuarioDto] })
  async update(@Param('id') id: number, @Body() data: UpdateUsuarioDto) {
    return await this.usuarioService.update(id, data);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: number) {
    return await this.usuarioService.remove(id);
  }
}
