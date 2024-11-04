import { Module } from '@nestjs/common';
import { ChatboxService } from './chatbox.service';
import { ChatboxController } from './chatbox.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chatbox, ChatboxSchema } from './schemas/chatbox.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chatbox.name, schema: ChatboxSchema }]),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [ChatboxService],
  controllers: [ChatboxController],
  providers: [ChatboxService],
})
export class ChatboxModule {}
