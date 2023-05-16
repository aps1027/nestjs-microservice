import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  checkHealth() {
    this.logger.log('Doing something...');
    return {
      message: 'healthy',
    };
  }
}
