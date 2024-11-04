import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, IsString } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class SignInDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Username must not be empty' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Invalid string format' })
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password must not be empty' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain at least one letter, one number, and one special character',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Password must be string' })
  readonly password: string;
}
