import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatboxDocument = HydratedDocument<Chatbox>;

@Schema({collection: 'chatboxes', timestamps: true})
export class Chatbox {
  @Prop({ required: true, type: [{ type: Number }] })
  participants: number[];
}

export const ChatboxSchema = SchemaFactory.createForClass(Chatbox);
