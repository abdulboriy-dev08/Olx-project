import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Do‘konning xizmatidan juda mamnunman! 👍' })
  description: string;

  @ApiProperty({ example: '5' })
  star: number;
}
