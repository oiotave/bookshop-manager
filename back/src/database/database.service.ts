import { Injectable, OnModuleInit } from '@nestjs/common';
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
  async onModuleInit() { await this.createTables() }

  private async createTables() {
    try {
      const sql = await fs.readFile('./src/database/create.sql', 'utf-8');
      await this.pool.query(sql);
    }
    catch (error) { throw error }
  }

  async databaseAccess(query: string, values: any[]) {
    try {
      const res = await this.pool.query(query, values)
      return res.rows
    }
    catch (error) { throw error }
  }
}