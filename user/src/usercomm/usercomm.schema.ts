import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsercommDocument = Usercomm & Document;

@Schema()
export class Usercomm {
  @Prop({ required: true })
  comm_id: string;

  @Prop({ required: true })
  user_id: string;
}

export const UsercommSchema = SchemaFactory.createForClass(Usercomm);