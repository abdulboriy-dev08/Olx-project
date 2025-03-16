import { ApiProperty, PartialType } from '@nestjs/swagger';
import { categoryDto } from './create-category.dto';
import { IsString } from 'class-validator';

export class updateCategoryDto extends PartialType(categoryDto) {
  @IsString()
  @ApiProperty({ example: 'Fruits' })
  name: string;

  @ApiProperty({ example: '1741847862885.jpeg' })
  image: string;
}
