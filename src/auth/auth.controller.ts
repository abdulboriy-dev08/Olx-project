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
import { AuthGuard } from 'src/guard/auth-guard';
import { Request } from 'express';
import { updateRegisterDto } from './auth-dto/update-register-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User registration',
    description: 'Registers a new user with a username, email, and password.',
  })
  @Post('/register')
  register(@Body() data: registerDto) {
    return this.authService.register(data);
  }

  @ApiOperation({
    summary: 'User login',
    description: 'Logs in a user using username/email and password.',
  })
  @Post('/login')
  login(@Body() data: loginDto) {
    return this.authService.login(data);
  }

  @ApiOperation({
    summary: 'Get all Users',
    description: 'Get all Users',
  })
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() request: Request) {
    return this.authService.findAll(request);
  }

  @ApiOperation({
    summary: 'Get One User by ID',
    description: 'Get One User by ID',
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: Request) {
    return this.authService.findOne(id, request);
  }

  @ApiOperation({
    summary: 'Update users by ID',
    description: 'Update users by ID',
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegisterDto: updateRegisterDto,
    @Req() request: Request,
  ) {
    return this.authService.update(id, updateRegisterDto, request);
  }

  @ApiOperation({
    summary: 'Delete Users by ID',
    description: 'Delete Users By ID',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.authService.remove(id, request);
  }
}
