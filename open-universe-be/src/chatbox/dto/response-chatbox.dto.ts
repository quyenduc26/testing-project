import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'typeorm';

export class ResponseChatboxDTO {
  @ApiProperty({ type: ObjectId })
  _id: ObjectId;
}
