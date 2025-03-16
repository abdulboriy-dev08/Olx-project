import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { categoryDto } from './category-dto/create-category.dto';
import { updateCategoryDto } from './category-dto/update-category.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create a new Categories' })
  @Post()
  create(@Body() CategoryDto: categoryDto) {
    return this.categoriesService.create(CategoryDto);
  }

  @ApiOperation({ summary: 'Get all Categories' })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: 'Get One Category By ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Categories By ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: updateCategoryDto) {
    return this.categoriesService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete Categories By ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
