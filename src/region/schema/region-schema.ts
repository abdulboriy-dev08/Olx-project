import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RegionDocument = HydratedDocument<Region>;

@Schema({versionKey: false})
export class Region {
  @Prop()
  name: string;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
