import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { HydratedDocument } from 'mongoose';

export type RegionDocument = HydratedDocument<Region>;

@Schema({ versionKey: false })
export class Region {
  @IsString()
  @Prop()
  name: string;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
