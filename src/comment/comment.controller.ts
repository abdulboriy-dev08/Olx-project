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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './comment-dto/create-comment.dto';
import { UpdateCommentDto } from './comment-dto/update-comment.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { userRole } from 'src/auth/schema/auth-schema';
import { ApiOperation } from '@nestjs/swagger';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({summary: 'Create and Leave comments'})
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() request: Request) {
    return this.commentService.create(createCommentDto, request);
  }
  
  @ApiOperation({summary: 'Get all comments'})
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @ApiOperation({summary: 'Get only one comment By ID '})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @ApiOperation({summary: 'Update comments By ID'})
  @Roles(userRole.CLIENT, userRole.USER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(id, updateCommentDto);
  }

  @ApiOperation({summary: 'Delete comments By ID'})
  @Roles(userRole.CLIENT, userRole.USER)
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}