import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Do‘konning xizmatidan juda mamnunman! 👍' })
  description: string;

  @ApiProperty({ example: '5' })
  star: number;

  @ApiProperty({ example: '67d7edc30e6c4e6e722a0afc' })
  banner: string;
}
