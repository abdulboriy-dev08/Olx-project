import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBannerDto } from './banner-dto/create-banner.dto';
import { UpdateBannerDto } from './banner-dto/update-banner.dto';
import { Model } from 'mongoose';
import { Banner } from './schema/banner-schema';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Auth } from 'src/auth/schema/auth-schema';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner.name) private bannerModel: Model<Banner>,
    @InjectModel(Auth.name) private authModel: Model<Auth>,
  ) {}

  async findBanner(id: string) {
    try {
      return await this.bannerModel
        .findById(id)
        .select('-comment')
        .populate({ path: 'auth', select: '-comment -banner' });
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async create(createBannerDto: CreateBannerDto, request: Request) {
    try {
      let user = request['user'];

      let newBanner = {
        ...createBannerDto,
        auth: user.id,
      };

      let banner = await this.bannerModel.create(newBanner);

      await this.authModel.findByIdAndUpdate(banner.auth, {
        $push: { banner: { $each: [banner._id] } },
      });

      return { banner };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let banners = await this.bannerModel
        .find()
        .select('-comment')
        .populate({ path: 'auth', select: '-comment -banner' })
        .populate('category')
        .exec();
      if (!banners.length) return { message: 'Banner table empty' };

      return { banners };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let banner = await this.findBanner(id);
      if (!banner) return new NotFoundException('Banner not found ❗');

      return banner;
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(id: string, updateBannerDto: UpdateBannerDto) {
    try {
      let banner = await this.findBanner(id);
      if (!banner) return new NotFoundException('Banner not found ❗');

      let newBanner = await this.bannerModel.findByIdAndUpdate(
        id,
        updateBannerDto,
        { new: true },
      );
      return { newBanner };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let banner = await this.findBanner(id);
      if (!banner) return new NotFoundException('Banner not found ❗');

      await this.bannerModel.findByIdAndDelete(id);
      return { message: 'Banner deleted successuflly ✅' };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
