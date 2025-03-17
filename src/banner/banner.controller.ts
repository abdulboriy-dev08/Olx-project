import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './banner-dto/create-banner.dto';
import { UpdateBannerDto } from './banner-dto/update-banner.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { userRole } from 'src/auth/schema/auth-schema';
import { ApiOperation } from '@nestjs/swagger';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @ApiOperation({ summary: 'Create banners' })
  @Roles(userRole.SELLER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createBannerDto: CreateBannerDto, @Req() request: Request) {
    return this.bannerService.create(createBannerDto, request);
  }

  @ApiOperation({ summary: 'Get all banners' })
  @Get()
  findAll() {
    return this.bannerService.findAll();
  }

  @ApiOperation({ summary: 'Get one banner By ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(id);
  }

  @ApiOperation({ summary: 'Update banners By ID' })
  @Roles(userRole.SELLER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(id, updateBannerDto);
  }

  @ApiOperation({ summary: 'Delete banners By ID' })
  @Roles(userRole.SELLER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(id);
  }
}
