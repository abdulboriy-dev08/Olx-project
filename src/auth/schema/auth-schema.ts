import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
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

  @Prop({ default: 'USER' })
  userType: userType;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Region' }] })
  region: Region[];

  @Prop()
  shopName: string;

  @Prop({ required: true })
  location: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
