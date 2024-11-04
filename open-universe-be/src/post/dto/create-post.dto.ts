import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreatePostDto {
  @ApiProperty()
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'User id must be a number' })
  @IsNotEmpty({ message: 'User id must not be empty' })
  user_id: number;

  @ApiProperty()
  @MaxLength(10000, { message: 'Content must be less than 10000 characters' })
  @IsNotEmpty({ message: 'Content must not be empty' })
  @Transform(({ value }) => value?.trim())
  @IsString({ message: 'Content must be a string' })
  content: string;

  @ApiProperty()
  @IsString({ message: 'Media url must be a string' })
  @IsOptional()
  media_url: string;
}
