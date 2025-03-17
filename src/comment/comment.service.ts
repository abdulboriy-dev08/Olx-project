import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './comment-dto/create-comment.dto';
import { UpdateCommentDto } from './comment-dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schema/comment-schema';
import { Request } from 'express';
import { Auth } from 'src/auth/schema/auth-schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Auth.name) private authModel: Model<Auth>,
  ) {}

  async findComment(id: string) {
    try {
      return await this.commentModel
        .findById(id)
        .populate({ path: 'auth', select: '-comment -banner' })
        .populate({ path: 'banner', select: '-comment -auth' });
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async create(createCommentDto: CreateCommentDto, request: Request) {
    try {
      let users = request['user'];

      let data = {
        ...createCommentDto,
        auth: users.id,
      };

      let comment = await this.commentModel.create(data);

      await this.authModel.findByIdAndUpdate(comment.auth, {
        $push: { comment: { $each: [comment._id] } },
      });

      return { comment };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let comments = await this.commentModel
        .find()
        .populate({ path: 'auth', select: '-comment -banner' })
        .populate({ path: 'banner', select: '-comment -auth' })
        .exec();
      if (!comments.length) return { message: 'Comments table empty' };

      return { comments };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let comment = await this.findComment(id);
      if (!comment) return new NotFoundException('Comment not found ❗');

      return { comment };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      let findComment = await this.commentModel.findById(id);
      if (!findComment) return new NotFoundException('Comment not found ❗');

      let newComment = await this.commentModel.findByIdAndUpdate(
        id,
        updateCommentDto,
        { new: true },
      );

      return { newComment };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let findComment = await this.commentModel.findById(id);
      if (!findComment) return new NotFoundException('Comment not found ❗');

      await this.commentModel.findByIdAndDelete(id);
      return { message: 'Comment deleted successfully ✅' };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
