import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Banner, BannerSchema } from './schema/banner-schema';
import { Auth, AuthSchema } from 'src/auth/schema/auth-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Banner.name, schema: BannerSchema },
      { name: Auth.name, schema: AuthSchema },
    ]),
  ],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
