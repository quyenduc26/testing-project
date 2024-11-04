import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/messages/schemas/message.schema';
import { Chatbox } from 'src/chatbox/schemas/chatbox.schema';
import { ChatboxModule } from 'src/chatbox/chatbox.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    ChatboxModule,
  ],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
