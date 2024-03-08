import { Document } from 'mongoose';

export interface IMessage extends Document {
  content: string;
  createdAt: Date;
}
