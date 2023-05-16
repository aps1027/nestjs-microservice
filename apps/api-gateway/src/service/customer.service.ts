import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateCustomerDto } from '../dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomerService {
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

  create(data: CreateCustomerDto) {
    return this.client.send({ role: 'customer', cmd: 'create' }, data);
  }

  findAll() {
    return this.client.send(
      { role: 'customer', cmd: 'find-all' },
      { data: 'test' },
    );
  }
}
