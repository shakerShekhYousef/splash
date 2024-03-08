import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({type: String})
  content: any;

  @Prop()
  receivedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
