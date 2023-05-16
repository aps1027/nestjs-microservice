import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import { LoggingService } from '@app/logging';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const loggingService = new LoggingService();
  const configService = new ConfigService();
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get<string>('AUTH_PORT'),
    },
    logger: WinstonModule.createLogger({
      transports: [...loggingService.getWistonDailyFileTransports()],
    }),
  });
  await app.listen();
}
bootstrap();
