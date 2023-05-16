import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingService } from '@app/logging';
import { WinstonModule } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const loggingService = new LoggingService();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [...loggingService.getWistonDailyFileTransports()],
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('Recipe: API Documentation')
    .setDescription('API Documentation')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8000);
}
bootstrap();
