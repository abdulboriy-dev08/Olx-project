import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';
import mongoose, { Date, HydratedDocument } from 'mongoose';
import { Auth } from 'src/auth/schema/auth-schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ versionKey: false, timestamps: true })
export class Comment {
  @IsString()
  @Prop()
  description: string;

  @IsNumber()
  @Prop()
  star: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  auth: Auth;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
