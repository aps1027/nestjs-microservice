import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CustomerService } from '../service/customer.service';
import { CreateCustomerDto } from '../dto';

@Controller()
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @MessagePattern({ role: 'customer', cmd: 'create' })
  create(data: CreateCustomerDto) {
    return this.service.create(data);
  }

  @MessagePattern({ role: 'customer', cmd: 'find-all' })
  findAll() {
    return this.service.findAll();
  }
}
