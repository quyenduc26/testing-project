import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAddressDto {
  @ApiProperty({ type: String })
  @MaxLength(1000, { message: 'Street must be less than 1000 characters' })
  @Transform(({ value }) => typeof value === 'string' && value?.trim())
  @IsString({ message: 'Street must be a string' })
  street: string;

  @ApiProperty({ type: String })
  @MaxLength(1000, { message: 'State must be less than 1000 characters' })
  @Transform(({ value }) => typeof value === 'string' && value?.trim())
  @IsString({ message: 'State must be a string' })
  state: string;

  @ApiProperty({ type: String })
  @MaxLength(1000, { message: 'Cỉty must be less than 1000 characters' })
  @Transform(({ value }) => typeof value === 'string' && value?.trim())
  @IsString({ message: 'Cỉty must be a string' })
  city: string;

  @ApiProperty({ type: String })
  @MaxLength(1000, { message: 'Country must be less than 1000 characters' })
  @Transform(({ value }) => typeof value === 'string' && value?.trim())
  @IsString({ message: 'Country must be a string' })
  country: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean({ message: 'Isdefafult must be boolean' })
  isDefault: boolean;

  @ApiProperty({ type: Number })
  @IsNumber({}, { message: 'User id must be number' })
  userId: number;
}
