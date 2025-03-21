import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { registerDto } from './register-dto';
import { userRole } from '../schema/auth-schema';

export class updateRegisterDto extends PartialType(registerDto) {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Benjamin Franklin' })
  fullName?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ example: 'benjaminfrank@example.com' })
  email?: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'newpassword123!' })
  password?: string;

  @IsOptional()
  @IsPhoneNumber()
  @ApiPropertyOptional({ example: '+9985075255354' })
  phone?: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'avatar.png' })
  avatar?: string;

  @IsOptional()
  @IsEnum(userRole)
  @ApiPropertyOptional({ example: 'SELLER' })
  role?: userRole;

  @IsOptional()
  @ApiPropertyOptional({ example: '67d25f569d198ce0a684066c' })
  region?: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'My Awesome Store' })
  shopName?: string;

  @IsOptional()
  @ApiPropertyOptional({ example: "Farg'ona, Uzbekistan" })
  location?: string;
}
