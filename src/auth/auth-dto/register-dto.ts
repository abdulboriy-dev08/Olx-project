import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class registerDto {
  @IsString()
  @ApiProperty({ example: 'John Doe' })
  fullName: string;

  @IsEmail()
  @ApiProperty({ example: 'johndoe@example.com' })
  email: string;

  @ApiProperty({ example: '12345' })
  password: string;

  @IsPhoneNumber()
  @ApiProperty({ example: '+998507525150' })
  phone: string;

  @ApiProperty({ example: 'avatar.png' })
  avatar: string;

  @ApiProperty({ example: 'ADMIN' })
  userType: string;

  @ApiProperty({ example: '67d25f569d198ce0a684066c' })
  region: string;

  @ApiProperty({ example: 'Magazin' })
  shopName: string;

  @ApiProperty({ example: 'Qatortol street' })
  location: string;
}
