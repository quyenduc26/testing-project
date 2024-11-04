import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @IsNumber({}, { message: 'Sender ID must be Number.' })
  @IsNotEmpty({ message: 'Sender ID should not be empty.' })
  readonly senderId: number;

  @ApiProperty()
  @Transform(({ value }) => value?.trim())
  @MaxLength(500, { message: 'Content must less then 500 character.' })
  @IsString({ message: 'Sender ID should be String.' })
  @IsNotEmpty({ message: 'Sender ID should not be empty.' })
  readonly message: string;

  @ApiProperty()
  @Transform(({ value }) => value?.trim())
  @IsString({ message: 'Chatbox ID should be String.' })
  @IsNotEmpty({ message: 'Chatbox ID shouldnt be empty.' })
  readonly chatboxId: string;
}
