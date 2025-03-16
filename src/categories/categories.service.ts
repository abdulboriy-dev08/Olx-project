import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { categoryDto } from './category-dto/create-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schema/category-schema';
import { updateCategoryDto } from './category-dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findCategory(id: string) {
    return await this.categoryModel.findById(id);
  }

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
      if (!findCategories.length) return { message: 'Categories table empty' };

      return findCategories;
    } catch (error) {
      throw new BadRequestException(error.messagw);
    }
  }

  async findOne(id: string) {
    try {
      let category = await this.findCategory(id);
      if (!category) return new NotFoundException('Category not found ❗');

      return { category };
    } catch (error) {
      throw new BadRequestException(error.messagw);
    }
  }

  async update(id: string, data: updateCategoryDto) {
    try {
      let category = await this.findCategory(id);
      if (!category) return new NotFoundException('Category not found ❗');

      let newCategory = await this.categoryModel.findByIdAndUpdate(id, data, {
        new: true,
      });

      return { newCategory };
    } catch (error) {
      throw new BadRequestException(error.messagw);
    }
  }

  async remove(id: string) {
    try {
      let category = await this.findCategory(id);
      if (!category) return new NotFoundException('Category not found ❗');

      await this.categoryModel.findByIdAndDelete(id);
      return { message: 'Category deleted successfully ✅' };
    } catch (error) {
      throw new BadRequestException(error.messagw);
    }
  }
}
