import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { ValidationPipe } from '@nestjs/common';

import * as dotenv from 'dotenv' 
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Gerenciador de livraria virtual')
    .setDescription('Projeto final da disciplina de Banco de Dados I')
    .setVersion('3.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);

  const theme = new SwaggerTheme();
  const opt = { explore: true, customCss: theme.getBuffer(SwaggerThemeNameEnum.CLASSIC) };
  SwaggerModule.setup('api', app, document, opt);

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();