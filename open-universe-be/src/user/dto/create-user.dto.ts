import { ApiProperty } from '@nestjs/swagger';
import { Gender, UserRole } from 'src/constants';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
  IsEnum,
  Matches,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Full name must not be empty' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Fullname must be string' })
  fullName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Username must not be empty' })
  @Matches(/^\S*$/, { message: 'Username must not contain spaces' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Username must be string' })
  userName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email must not be empty' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password must not be empty' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long and contain at least one letter, one number, and one special character',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Password must be string' })
  password: string;

  @ApiProperty({ format: 'date' })
  @IsOptional()
  @IsDateString({}, { message: 'Invalid date format. Must be in ISO format' })
  dateOfBirth?: Date;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsPhoneNumber('VN', { message: 'Invalid phone number format for Vietnam' })
  phoneNumber?: string;

  @ApiProperty({ description: 'Role of user', enum: UserRole, default: UserRole.USER })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Invalid role' })
  role?: UserRole;

  @ApiProperty({ description: 'Gender of user', enum: Gender, default: Gender.MALE })
  @IsOptional()
  @IsEnum(Gender, { message: 'Invalid gender' })
  gender?: Gender;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Avatar must be string' })
  avatar?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Cover must be string' })
  cover?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Biography must be string' })
  biography?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Instagram link must be string' })
  instagram?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString({ message: 'Facebook link must be string' })
  facebook?: string;
}
