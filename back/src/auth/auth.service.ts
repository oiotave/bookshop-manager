import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private databaseService: DatabaseService) {}

  async login(usuario: any) {
    const payload = { username: usuario.nome, sub: usuario.id };
    
    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUser(email: string, senha: string): Promise<any> {
    const query = `SELECT id, email, senha, funcao, nome FROM usuario WHERE email = $1`
    const res = await this.databaseService.databaseAccess(query, [email]);

    if (res.length === 0) { return null }

    const usuario = res[0];
    
    const senha_hash = await bcrypt.hash(usuario.senha, 10);
    const validez = await bcrypt.compare(senha, senha_hash);

    if (!validez) { return null }

    else { return { id: usuario.id, nome: usuario.nome, funcao: usuario.funcao } }
  }
}
