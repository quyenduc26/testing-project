import { ResponseMessageDto } from './dto/response-message.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Model } from 'mongoose';
import { Message } from 'src/messages/schemas/message.schema';
import { ChatboxService } from 'src/chatbox/chatbox.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private MessageModel: Model<Message>,
    private ChatboxService: ChatboxService,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<ResponseMessageDto> {
    const newMessage = await this.MessageModel.create(createMessageDto);
    return this.mapToResponseMessage(newMessage);
  }

  async joinRoom(participants: number[]) {
    const response = await this.ChatboxService.findOrCreate({ participants });
    return response;
  }

  async findAll(id: string): Promise<ResponseMessageDto[]> {
    const messages = await this.MessageModel.find({ chatboxId: id });
    return messages.map((message) => this.mapToResponseMessage(message));
  }

  mapToResponseMessage(message: any) {
    return {
      id: message._id,
      senderId: message.senderId,
      message: message.message,
      imageUrl: message.imageUrl,
      chatboxId: message.chatboxId,
    };
  }
}
