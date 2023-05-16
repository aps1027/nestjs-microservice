import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../service/customer.service';
import { CreateCustomerDto } from '../dto';

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(private readonly service: CustomerService) {}

  @Post('create')
  create(@Body() data: CreateCustomerDto) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
