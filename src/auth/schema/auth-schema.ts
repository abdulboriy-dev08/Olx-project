import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Region } from 'src/region/schema/region-schema';

export type AuthDocument = HydratedDocument<Auth>;

enum userTpe {
    SELLER = 'SELLER',
    ADMIN = 'ADMIN',
    CLIENT = 'CLIENT',
}

@Schema({versionKey: false})
export class Auth {
  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  avatar: string;

  @Prop()
  userType: userTpe;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Region'}]})
  region: Region[];

  @Prop()
  shopName: string;

  @Prop()
  location: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
