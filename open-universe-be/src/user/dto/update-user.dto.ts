import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ActiveStatus } from 'src/constants';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'Status of user', enum: ActiveStatus })
  @IsEnum(ActiveStatus, { message: 'Invalid status' })
  @IsOptional()
  status?: ActiveStatus;
}
