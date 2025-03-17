import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ versionKey: false, timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
