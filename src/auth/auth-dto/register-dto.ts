import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

enum userType {
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  USER = 'USER',
}

export class registerDto {
  @IsString()
  @ApiProperty({ example: 'Abdulboriy Mahamatjanov' })
  fullName: string;

  @IsEmail()
  @ApiProperty({ example: 'abdulborimahammadjanov86@gmail.com' })
  email: string;

  @ApiProperty({ example: 'StrongPassword123!' })
  password: string;

  @IsPhoneNumber()
  @ApiProperty({ example: '+998507525150' })
  phone: string;

  @ApiProperty({ example: 'avatar.png' })
  avatar: string;

  @ApiProperty({ example: 'ADMIN' })
  @IsEnum(userType)
  userType: userType;

  @ApiProperty({ example: '67d25f569d198ce0a684066c' })
  region: string;

  @ApiPropertyOptional({ example: 'My Awesome Store' })
  @ValidateIf((o) => o.userType === userType.SELLER)
  @IsNotEmpty({ message: 'ShopName is required for SELLER' })
  shopName: string;

  @ApiPropertyOptional({ example: 'Tashkent, Uzbekistan' })
  location: string;
}
