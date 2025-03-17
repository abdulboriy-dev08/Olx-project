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
        .populate({ path: 'auth', select: '-comment' });
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async create(createCommentDto: CreateCommentDto, request: Request) {
    try {
      let users = request['user'];
      let userRoles = ['USER', 'CLIENT'];

      if (!userRoles.includes(users.userType))
        return new ForbiddenException("You can't leave comment ❗");

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
        .populate({ path: 'auth', select: '-comment' })
        .exec();
      if (!comments.length) return { message: 'Comments table empty' };

      return { comments };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let data = await this.findComment(id);
      if (!data) return new NotFoundException('Comment not found ❗');

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
    request: Request,
  ) {
    try {
      let user = request['user'];
      let userRoles = ['USER', 'CLIENT'];

      let findComment = await this.commentModel.findById(id);
      if (!findComment) return new NotFoundException('Comment not found ❗');

      if (findComment.auth !== user.id && !userRoles.includes(user.userType))
        return new ForbiddenException("You can't update this comment ❗");

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

  async remove(id: string, request: Request) {
    try {
      let user = request['user'];
      let userRoles = ['USER', 'CLIENT'];

      let findComment = await this.commentModel.findById(id);
      if (!findComment) return new NotFoundException('Comment not found ❗');

      if (findComment.auth !== user.id && !userRoles.includes(user.userType))
        return new ForbiddenException("You can't delete this comment ❗");

      await this.commentModel.findByIdAndDelete(id);
      return { message: 'Comment deleted successfully ✅' };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
