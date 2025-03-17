import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './auth-dto/register-dto';
import { loginDto } from './auth-dto/login-dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';
import { updateRegisterDto } from './auth-dto/update-register-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { userRole } from './schema/auth-schema';
import { RoleGuard } from 'src/guards/role.guard';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User registration', description: 'Registers a new user with a username, email, and password.' })
  @Post('/register')
  register(@Body() data: registerDto) {
    return this.authService.register(data);
  }

  @ApiOperation({ summary: 'User login', description: 'Logs in a user using username/email and password.' })
  @Post('/login')
  login(@Body() data: loginDto) {
    return this.authService.login(data);
  }

  @ApiOperation({ summary: 'Get all Users', description: 'Get all Users' })
  @Roles(userRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @ApiOperation({ summary: 'Get One User by ID', description: 'Get One User by ID' })
  @Roles(userRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @ApiOperation({ summary: 'Update users by ID', description: 'Update users by ID' })
  @Roles(userRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegisterDto: updateRegisterDto) {
    return this.authService.update(id, updateRegisterDto);
  }

  @ApiOperation({ summary: 'Delete Users by ID', description: 'Delete Users By ID' })
  @Roles(userRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
