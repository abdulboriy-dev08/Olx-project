import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { registerDto } from './register-dto';

export class updateRegisterDto extends PartialType(registerDto) {
  @IsString()
  @ApiProperty({ example: 'Berjamin Franklin' })
  fullName: string;

  @IsEmail()
  @ApiProperty({ example: 'berjaminfrank@example.com' })
  email: string;

  @ApiProperty({ example: 'frank342' })
  password: string;

  @IsPhoneNumber()
  @ApiProperty({ example: '+998507525151' })
  phone: string;

  @ApiProperty({ example: 'avatar.png' })
  avatar: string;

  @ApiProperty({ example: 'SELLER' })
  userType: string;

  @ApiProperty({ example: '67d25f569d198ce0a684066c' })
  region: string;

  @ApiProperty({ example: 'Magazin' })
  shopName: string;

  @ApiProperty({ example: 'Chilonzor street' })
  location: string;
}
