import { Module } from '@nestjs/common';
import { UploadImageController } from './upload-image.controller';

@Module({
  controllers: [UploadImageController],
  providers: [],
})
export class UploadImageModule {}
