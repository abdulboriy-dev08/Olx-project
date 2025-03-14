import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './auth-dto/register-dto';
import { loginDto } from './auth-dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() data: registerDto) {
    return this.authService.register(data);
  }

  @Post('/login')
  login(@Body() data: loginDto) {
    return this.authService.login(data);
  }
}