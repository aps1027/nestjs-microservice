import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private client: ClientProxy;
  constructor(private configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: this.configService.get<string>('AUTH_HOST'),
        port: this.configService.get<number>('AUTH_PORT'),
      },
    });
  }

  checkHealth() {
    return this.client.send(
      { role: 'auth', cmd: 'check-health' },
      { data: 'test' },
    );
  }
}
