import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { regionDto } from './region-dto/region-dto';
import { ApiOperation } from '@nestjs/swagger';
import { updateRegionDto } from './region-dto/update-region-dto';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'Create a new region' })
  @Post()
  create(@Body() data: regionDto) {
    return this.regionService.create(data);
  }

  @ApiOperation({ summary: 'Get all Regions' })
  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @ApiOperation({ summary: 'Get One Region By ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Regions By ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: updateRegionDto) {
    return this.regionService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete Regions By ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(id);
  }
}
