import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'src/address/entities/address.entity';
export class ResponseUserDTO {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  fullName?: string;

  @ApiProperty()
  userName?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty({ required: false })
  status?: string;

  @ApiProperty({ required: false })
  role?: string;

  @ApiProperty({ required: false })
  gender?: number;

  @ApiProperty({ required: false })
  phoneNumber?: string;

  @ApiProperty()
  address?: Address[];
}
