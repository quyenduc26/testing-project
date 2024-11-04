import { IsOptional, IsEnum, IsString } from 'class-validator';
import { searchType } from 'src/constants';

export class SearchQueryDto {
  @IsString()
  key: string;

  @IsOptional()
  @IsEnum(searchType)
  searchUser?: searchType;

  @IsOptional()
  @IsEnum(searchType)
  searchPost?: searchType;
}
