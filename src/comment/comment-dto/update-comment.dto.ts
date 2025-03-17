import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({ example: "Buyurtma qildim, lekin mahsulot sifatsiz chiqdi 😕" })
  description: string;

  @ApiProperty({ example: '2' })
  star: number;
}
