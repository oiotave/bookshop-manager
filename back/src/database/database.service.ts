import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import { promises as fs } from 'fs'

import * as dotenv from 'dotenv' 
dotenv.config()

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool: Pool;
  
  constructor() {
    this.pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: Number(process.env.DB_PORT),
    });
  }
  async onModuleInit() { await this.create() }

  private async create() {
    try {
      const tables = await fs.readFile('./src/database/sql/create.sql', 'utf-8');
      await this.pool.query(tables);

      const views = await fs.readFile('./src/database/sql/views.sql', 'utf-8');
      await this.pool.query(views);

      const procedures = await fs.readFile('./src/database/sql/procedures.sql', 'utf-8');
      await this.pool.query(procedures);
    }
    catch (error) { throw new InternalServerErrorException(`Erro ao criar tabelas: ${error.message}`) }
  }

  async databaseAccess(query: string, values: any[]) {
    try {
      const res = await this.pool.query(query, values)
      return res.rows
    }
    catch (error) { throw new InternalServerErrorException(`Erro ao fazer query: ${error.message}`) }
  }
}