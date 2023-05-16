import { Module } from '@nestjs/common';
import { Controllers } from './controller';
import { Services } from './service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [...Controllers],
  providers: [...Services],
})
export class AppModule {}
