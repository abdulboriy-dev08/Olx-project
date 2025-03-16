import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class loginDto {
  @IsEmail()
  @ApiProperty({ example: 'johndoe@example.com' })
  email: string;

  @ApiProperty({ example: '12345' })
  password: string;
}
