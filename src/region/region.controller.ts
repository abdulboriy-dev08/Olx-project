import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RegionService } from './region.service';
import { regionDto } from './region-dto/region-dto';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  create(@Body() data: regionDto) {
    return this.regionService.create(data);
  }

  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, data: Partial<regionDto>) {
    return this.regionService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(id);
  }
}
