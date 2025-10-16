import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RelatoriosService {
  constructor(private databaseService: DatabaseService) {}

  async relatorioEstoque() {
    let total: number, list: any[];

    try {
      const query = `
        SELECT SUM(quantidade_estoque) AS total 
        FROM estoque`;

      const res = await this.databaseService.databaseAccess(query, []);
      total = res[0].total;
    }
    catch (error) { throw error; }

    try {
      const query = `
        SELECT livro.titulo, estoque.edicao, estoque.preco_unitario, estoque.quantidade_estoque
        FROM livro INNER JOIN estoque
        ON livro.isbn = estoque.isbn
        WHERE estoque.quantidade_estoque > 0`;

      list = await this.databaseService.databaseAccess(query, []);
    }
    catch (error) { throw error; }

    return { total: total, tuplas: list };
  }

  async relatorioAutores() {
    let qtdAutores: number, nacionalidadeAutores: any[];

    try {
      const query = `SELECT COUNT(*) AS total FROM autor`;
      
      const res = await this.databaseService.databaseAccess(query, []);
      
      qtdAutores = res[0].total;
    } 
    catch (error) { throw error; }

    try {
      const query = `
        SELECT nacionalidade, COUNT(*) AS quantidade 
        FROM autor WHERE nacionalidade IS NOT NULL 
        GROUP BY nacionalidade`;

      nacionalidadeAutores = await this.databaseService.databaseAccess(query, []);
    }
    catch (error) { throw error; }

    return { total: qtdAutores, qtd_nacionalidade: nacionalidadeAutores };
  }

  async relatorioEditoras() {
    let qtd: number, names: any[];

    try {
      const query = `SELECT COUNT(*) AS total FROM editora`;
      
      const res = await this.databaseService.databaseAccess(query, []);
      
      qtd = res[0].total;
    }
    catch (error) { throw error; }

    try {
      const query = `SELECT nome FROM editora`;
      names = await this.databaseService.databaseAccess(query, []);
    } 
    catch (error) { throw error; }

    return { quantidade: qtd, nomes: names };
  }

  async relatorioPrecos() {
    let min: number, max: number, avg: number;

    try {
      const query = `
        SELECT MIN(preco_unitario) AS min, MAX(preco_unitario) AS max, AVG(preco_unitario) AS avg
        FROM estoque`;

      const res = await this.databaseService.databaseAccess(query, []);
      min = res[0].min;
      max = res[0].max;
      avg = res[0].avg;
    }
    catch (error) { throw error; }

    return { min: min, max: max, avg: avg };
  }

  async relatorioGeneroLivros() {
    let list: any[];

    try {
      const query = `
        SELECT genero, COUNT(*) AS quantidade 
        FROM livro WHERE genero IS NOT NULL 
        GROUP BY genero`;

      list = await this.databaseService.databaseAccess(query, []);
    }
    catch (error) { throw error; }

    return { qtd_genero: list };
  }

  async relatorioVendas() {
    const query = `SELECT * FROM relatorio_vendas`;

    let todas_vendas: any[];
    let qtd_livros: number;
    let receita: number;

    try {
      todas_vendas = await this.databaseService.databaseAccess(query, []);

      const res = await this.databaseService.databaseAccess(`
        SELECT SUM(pedido.quantidade_total) AS qtd_livros, SUM(pagamento.valor) AS receita FROM validacao_pagamento
        JOIN pedido ON validacao_pagamento.id_pedido = pedido.id
        JOIN pagamento ON validacao_pagamento.id_pagamento = pagamento.id`, []);

      qtd_livros = res[0].qtd_livros;
      receita = res[0].receita;
    }
    catch (error) { throw error; }

    return { qtd_livros: qtd_livros, receita: receita, todas_vendas: todas_vendas };
  }
}
