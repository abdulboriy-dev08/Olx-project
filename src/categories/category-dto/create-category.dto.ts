import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class categoryDto {
  @IsString()
  @ApiProperty({ example: 'Cars' })
  name: string;

  @ApiProperty({ example: '1741847862885.jpeg' })
  image: string;
}
