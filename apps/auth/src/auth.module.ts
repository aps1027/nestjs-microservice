import { Module } from '@nestjs/common';
import { Controllers } from './controller';
import { Services } from './service';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [...Controllers],
  providers: [...Services],
})
export class AuthModule {}
