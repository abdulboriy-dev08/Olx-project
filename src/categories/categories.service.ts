import { BadRequestException, Injectable } from '@nestjs/common';
import { categoryDto } from './category-dto/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schema/category-schema';

@Injectable()
export class CategoriesService {
  constructor (@InjectModel(Category.name) private categoryModel: Model<Category>) {};

  async create(data: categoryDto) {
    try {
      return await this.categoryModel.create(data);
    } catch (error) {
      throw new BadRequestException(error.messagw);
    } 
  }

  async findAll() {
    try {
      let findCategories = await this.categoryModel.find().exec();
      if(!findCategories.length) return {message: "Categories table empty"};

      return findCategories;
    } catch (error) {
      throw new BadRequestException(error.messagw);
    }
  }

  async findOne(id: string) {
    try {
      
    } catch (error) {
      throw new BadRequestException(error.messagw);
    }
  }

  async update(id: string, data: Partial<categoryDto>) {
    try {
      
    } catch (error) {
      throw new BadRequestException(error.messagw);
    }
  }

  async remove(id: string) {
    try {
      
    } catch (error) {
      throw new BadRequestException(error.messagw);
    }
  }
}
