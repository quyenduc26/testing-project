import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { Timestamp } from 'typeorm';

export class CommentResponseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId?: number;

  @ApiProperty({ required: false })
  postId?: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  mediaUrl: string;

  @ApiProperty({ required: false })
  status?: string;

  @ApiProperty({ type: () => User })
  user: {
    id: number;
    userName: string;
    avatar: string;
  };

  @ApiProperty()
  createAt?: Timestamp;
}
