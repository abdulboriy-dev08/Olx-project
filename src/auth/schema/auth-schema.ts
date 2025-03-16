import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Banner } from 'src/banner/schema/banner-schema';
import { Region } from 'src/region/schema/region-schema';

export type AuthDocument = HydratedDocument<Auth>;

enum userType {
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  USER = 'USER',
}

@Schema({ versionKey: false })
export class Auth {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ type: String, enum: userType, default: userType.USER })
  userType: userType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Region' })
  region: Region;

  @Prop()
  shopName: string;

  @Prop()
  location: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Banner' }] })
  banner: Banner[];
 
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comment: Comment[];
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
