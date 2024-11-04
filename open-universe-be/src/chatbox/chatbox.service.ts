import { Injectable, NotFoundException, Query, Res } from '@nestjs/common';
import { CreateChatboxDto } from './dto/create-chatbox.dto';
import { UpdateChatboxDto } from './dto/update-chatbox.dto';
import { Chatbox } from './schemas/chatbox.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatboxService {
  constructor(
    @InjectModel(Chatbox.name) private chatboxModel: Model<Chatbox>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOrCreate(createChatboxDto: CreateChatboxDto): Promise<string> {
    let { participants } = createChatboxDto;

    for (const element of participants) {
      const existingUser = await this.userRepository.findOne({ where: { id: element } });

      if (!existingUser) {
        throw new NotFoundException(`Participant with ID ${element} does not exist.`);
      }
    }

    participants = participants.sort((a, b) => a - b);

    const existingChatBox = await this.chatboxModel.findOne({
      participants: participants,
    });

    if (existingChatBox) {
      return existingChatBox._id.toString();
    }

    const newTemporaryChatboxData = new Chatbox();
    newTemporaryChatboxData.participants = participants;

    const savedChatbox = await this.chatboxModel.create(newTemporaryChatboxData);

    return savedChatbox._id.toString();
  }

}
