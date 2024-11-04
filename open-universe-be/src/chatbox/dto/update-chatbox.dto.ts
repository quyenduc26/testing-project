import { PartialType } from '@nestjs/swagger';
import { CreateChatboxDto } from './create-chatbox.dto';

export class UpdateChatboxDto extends PartialType(CreateChatboxDto) {}
