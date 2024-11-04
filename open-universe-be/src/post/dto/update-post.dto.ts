import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ActiveStatus } from 'src/constants';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ description: 'Status of user', enum: ActiveStatus })
  @IsEnum(ActiveStatus, { message: 'Invalid status' })
  @IsOptional()
  status?: ActiveStatus;
}
