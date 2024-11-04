import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChatboxService } from './chatbox.service';
import { CreateChatboxDto } from './dto/create-chatbox.dto';
import { UpdateChatboxDto } from './dto/update-chatbox.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Chatboxes')
@Controller('chatboxes')
export class ChatboxController {
  constructor(private readonly chatboxService: ChatboxService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new chatbox' })
  @ApiCreatedResponse({ description: 'Chatbox has been successfully created' })
  @ApiBadRequestResponse({ description: 'Bad request. Check your input data' })
  async create(@Body() createChatboxDto: CreateChatboxDto) {
    return this.chatboxService.findOrCreate(createChatboxDto);
  }
}
