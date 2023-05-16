import { Controller } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ role: 'auth', cmd: 'check-health' })
  checkHealth() {
    return this.authService.checkHealth();
  }
}
