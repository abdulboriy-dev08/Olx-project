import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor (private jwtService: JwtService) {};

  canActivate( context: ExecutionContext, ): boolean {
    let request: Request = context.switchToHttp().getRequest();
    let token = request.headers.authorization?.split(' ')[1];

    if(!token) throw new BadRequestException("Token is wrong ❗");

    try {
      let data = this.jwtService.verify(token);
      request['user'] = data;

      return true;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
