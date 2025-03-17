import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsString } from 'class-validator';
import mongoose, { HydratedDocument, mongo } from 'mongoose';
import { Auth } from 'src/auth/schema/auth-schema';
import { Category } from 'src/categories/schema/category-schema';

export type BannerDocument = HydratedDocument<Banner>;

enum bannerType {
  NEW = 'NEW',
  OLD = 'OLD',
}

@Schema({ versionKey: false, timestamps: true })
export class Banner {
  @IsString()
  @Prop({ required: true })
  name: string;

  @IsString()
  @Prop()
  description: string;

  @IsNumber()
  @Prop({ required: true })
  price: number;

  @IsString()
  @Prop()
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: mongoose.Schema.Types.ObjectId;

  @Prop()
  type: bannerType;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comment: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Auth' })
  auth: Auth;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
