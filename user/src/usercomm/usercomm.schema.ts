import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsercommDocument = Usercomm & Document;

@Schema()
export class Usercomm {
  @Prop()
  static user_id: string;

  @Prop()
  static comm_id: string;
}

export const UsercommSchema = SchemaFactory.createForClass(Usercomm);