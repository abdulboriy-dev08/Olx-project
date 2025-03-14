import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Region } from './schema/region-schema';
import { Model } from 'mongoose';
import { regionDto } from './region-dto/region-dto';

@Injectable()
export class RegionService {
    constructor (@InjectModel(Region.name) private regionModel: Model<Region>) {}

    async findRegion(id: string) {
        try {
            return await this.regionModel.findById(id).exec();
        } catch (error) {
            return new BadRequestException(error.message);
        }
    }

    async create(data: regionDto) {
        try {
            return await this.regionModel.create(data);
        } catch (error) {
            return new BadRequestException(error.message);
        }
    }

    async findAll() {
        try {
            let findRegions = await this.regionModel.find().exec();
            if(!findRegions.length) return {message: "Region table empty"};

            return findRegions;
        } catch (error) {
            return new BadRequestException(error.message);
        }
    }

    async findOne(id: string) {
        try {
            let findRegion = await this.findRegion(id);
            if(!findRegion) return {error: "Region not found ❗"};

            return findRegion;
        } catch (error) {
            return new BadRequestException(error.message);
        }
    }

    async update(id: string, data: Partial<regionDto>) {
        try {
            let findRegion = await this.findRegion(id);
            if(!findRegion) return {error: "Region not found ❗"};

            return await this.regionModel.findByIdAndUpdate(id, data);
        } catch (error) {
            return new BadRequestException(error.message);
        }
    }

    async remove(id: string) {
        try {
            let findRegion = await this.findRegion(id);
            if(!findRegion) return {error: "Region not found ❗"};
            
            await this.regionModel.findByIdAndDelete(id);
            return {access_message: "Region deleted successfully ✅"};
        } catch (error) {
            return new BadRequestException(error.message);
        }
    }
}
