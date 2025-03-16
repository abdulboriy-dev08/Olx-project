import { ApiProperty, PartialType } from '@nestjs/swagger';
import { regionDto } from './region-dto';
import { IsString } from 'class-validator';

export class updateRegionDto extends PartialType(regionDto) {
  @ApiProperty({ example: 'Fargona' })
  @IsString()
  name: string;
}
