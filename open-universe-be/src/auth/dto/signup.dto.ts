import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Matches, IsString, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Username must not be empty' })
  @Matches(/^\S*$/, { message: 'Username must not contain spaces' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Username must be string' })
  userName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password must not be empty' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain at least one letter, one number, and one special character',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Password must be string' })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email must not be empty' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty()
  @MaxLength(1000, { message: 'Full namer must be less than 1000 characters' })
  @IsNotEmpty({ message: 'Full name not be empty' })
  @Transform(({ value }) => typeof value === 'string' && value?.trim())
  @IsString({ message: 'Full name must be a string' })
  fullName: string;
}
