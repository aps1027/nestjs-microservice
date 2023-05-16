import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  session_token: string;

  @ApiPropertyOptional()
  @IsOptional()
  shop_user_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  email?: string;
}
