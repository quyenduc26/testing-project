import { ApiProperty } from '@nestjs/swagger';

export class ResponseSearchUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  avatar?: string;
}
