import { PrismaService } from '@app/prisma';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCustomerDto } from '../dto';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(private prisma: PrismaService) {}

  async create(data: CreateCustomerDto) {
    this.logger.log(`Create Customer with ${JSON.stringify(data)}`);
    const { session_token, shop_user_id, username, email } = data;

    let customer = await this.prisma.customer.findUnique({
      where: { session_token },
      include: { user: true },
    });

    if (customer) {
      customer = await this.updateCustomer(
        customer.id,
        session_token,
        shop_user_id,
        username,
        email,
      );
    } else if (shop_user_id) {
      customer = await this.prisma.customer.findUnique({
        where: { shop_user_id },
        include: { user: true },
      });

      if (customer) {
        customer = await this.updateCustomer(
          customer.id,
          session_token,
          shop_user_id,
          username,
          email,
        );
      } else {
        customer = await this.createCustomer(
          session_token,
          shop_user_id,
          username,
          email,
        );
      }
    } else {
      customer = await this.createCustomer(
        session_token,
        shop_user_id,
        username,
        email,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      message: [],
      error: '',
      data: customer,
    };
  }

  private async updateCustomer(
    customerId: number,
    session_token: string,
    shop_user_id: string,
    username: string,
    email: string,
  ) {
    const customer = await this.prisma.customer.update({
      where: { id: customerId },
      data: {
        session_token: session_token ? session_token : null,
        shop_user_id: shop_user_id ? shop_user_id : null,
        user: { update: { username, email } },
      },
      include: { user: true },
    });

    this.logger.log(`Updated Customer ID: ${customer?.id}`);
    return customer;
  }

  private async createCustomer(
    session_token: string,
    shop_user_id: string,
    username: string,
    email: string,
  ) {
    const customer = await this.prisma.customer.create({
      data: {
        session_token: session_token ? session_token : null,
        shop_user_id: shop_user_id ? shop_user_id : null,
        user: { create: { username, email } },
      },
      include: { user: true },
    });

    this.logger.log(`Created Customer ID: ${customer?.id}`);
    return customer;
  }

  async findAll() {
    this.logger.log('Find All Customers');
    const customers = await this.prisma.customer.findMany({
      where: { deleted_at: null },
      include: { user: true },
    });

    return {
      statusCode: HttpStatus.OK,
      message: [],
      error: '',
      data: customers,
    };
  }
}
