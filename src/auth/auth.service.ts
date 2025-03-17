import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schema/auth-schema';
import { Model } from 'mongoose';
import { registerDto } from './auth-dto/register-dto';
import { loginDto } from './auth-dto/login-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { updateRegisterDto } from './auth-dto/update-register-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  async findUser(email: string) {
    try {
      return await this.authModel.findOne({ email });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async register(data: registerDto) {
    try {
      let user = await this.findUser(data.email);
      if (user) return { message: 'This account already exists ❗' };

      let hashPass = bcrypt.hashSync(data.password, 10);
      let userRegistered = await this.authModel.create({
        ...data,
        password: hashPass,
      });

      return userRegistered;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async login(data: loginDto) {
    try {
      let user = await this.findUser(data.email);
      if (!user) return { error: 'Email is wrong ❗' };

      let compPass = bcrypt.compareSync(data.password, user.password);
      if (!compPass) return { error: 'Password is wrong ❗' };

      let token = this.jwtService.sign({
        id: user._id,
        userType: user.userType,
      });
      return { access_token: token };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll(request: Request) {
    try {
      let user = request['user'];
      if (user.userType != 'ADMIN')
        return new ForbiddenException(
          'Not allowed, Only Admin can see all Users',
        );

      let data = await this.authModel.find().populate('comment').exec();
      if (!data.length) return { message: 'Auth table empty' };

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(id: string, request: Request) {
    try {
      let user = request['user'];
      if (user.userType != 'ADMIN')
        return new ForbiddenException('Not allowed, Only Admin can see User');

      let data = await this.authModel.findById(id).populate('comment');
      if (!data) return new NotFoundException('User not found ❗');

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(
    id: string,
    updateRegisterDto: updateRegisterDto,
    request: Request,
  ) {
    try {
      let user = request['user'];
      if (user.userType != 'ADMIN')
        return new ForbiddenException(
          'Not allowed, Only Admin can update Users',
        );

      let data = await this.authModel.findById(id);
      if (!data) return new NotFoundException('User not found ❗');

      let newUser = await this.authModel.findByIdAndUpdate(
        id,
        updateRegisterDto,
        { new: true },
      );
      
      return { newUser };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string, request: Request) {
    try {
      let user = request['user'];
      if (user.userType != 'ADMIN')
        return new ForbiddenException(
          'Not allowed, Only Admin can delete Users',
        );

      let data = await this.authModel.findById(id);
      if (!data) return new NotFoundException('User not found ❗');

      await this.authModel.findByIdAndDelete(id);
      return { message: 'User deleted successfully ✅' };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
