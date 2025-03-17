import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/schema/category-schema';

export class CreateBannerDto {
  @ApiProperty({ example: 'SuperMart Mega Sale' })
  name: string;

  @ApiProperty({ example: 'New Products, Welcome to our Olx shop 😊' })
  description: string;

  @ApiProperty({ example: '50000' })
  price: number;

  @ApiProperty({ example: '1742124747599.webp' })
  image: string;

  @ApiProperty({ example: '67d7f730fafee1653c2a640b' })
  category: string;

  @ApiProperty({ example: 'NEW' })
  type: string;
}
