import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ collection: 'messages', timestamps: true })
export class Message {
  @Prop({ required: true, type: Number })
  senderId: number;

  @Prop({ required: true, type: String })
  message: string;

  @Prop({ type: String })
  imageUrl: string;

  @Prop({ required: true, type: String })
  chatboxId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
