import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBannerDto } from './create-banner.dto';

export class UpdateBannerDto extends PartialType(CreateBannerDto) {
  @ApiProperty({ example: 'something' })
  name: string;

  @ApiProperty({ example: 'very comfortable to use' })
  description: string;

  @ApiProperty({ example: '70000' })
  price: number;

  @ApiProperty({ example: '1742124747599.webp' })
  image: string;

  @ApiProperty({ example: '67d7f730fafee1653c2a640b' })
  category: string;

  @ApiProperty({ example: 'OLD' })
  type: string;
}
