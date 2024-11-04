import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateCommentDto {
  @ApiProperty()
  @IsNumber({}, { message: 'UserId must be a number' })
  @IsNotEmpty({ message: 'Userid is must not be empty' })
  userId: number;

  @ApiProperty()
  @IsNumber({}, { message: 'PostId must be a number' })
  @IsNotEmpty({ message: 'Post id must not be empty' })
  postId: number;

  @ApiProperty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Content must be string' })
  @IsNotEmpty({ message: 'Content must not be empty' })
  content: string;

  @ApiProperty({ required: false })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'MediaUrl must be string' })
  @IsOptional()
  mediaUrl?: string;
}
