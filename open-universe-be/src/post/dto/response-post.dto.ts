import { ApiProperty } from '@nestjs/swagger';
import { CommentResponseDTO } from 'src/comment/dto/response-comment.dto';
// import { Comment } from 'src/comment/entities/comment.entity';
import { ResponseUserDTO } from 'src/user/dto/response-user.dto';
import { Timestamp } from 'typeorm';

export class ResponsePostDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  media_url: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  user: ResponseUserDTO;

  @ApiProperty()
  comments?: CommentResponseDTO[];

  @ApiProperty()
  createAt?: Timestamp;

  @ApiProperty()
  commentCount?: number;
}
