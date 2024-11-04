import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsOptional } from 'class-validator';
import { ActiveStatus } from 'src/constants';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({ description: 'Status of comment', enum: ActiveStatus, required: false })
  @IsOptional()
  status?: ActiveStatus;
}
