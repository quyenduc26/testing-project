import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'User id must not be empty' })
  userId: number;

  @ApiProperty()
  @IsNotEmpty({ message: ' must not be empty' })
  followerId: number;
}
