import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RegionModule } from './region/region.module';
import { UploadImageModule } from './upload/upload-image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoriesModule } from './categories/categories.module';
import { BannerModule } from './banner/banner.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/olx_clone'),
    ConfigModule.forRoot(),
    RegionModule,
    UploadImageModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/file',
    }),
    CategoriesModule,
    BannerModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
