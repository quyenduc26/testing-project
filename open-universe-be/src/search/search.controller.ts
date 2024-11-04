import {
  Controller,
  Get,
  HttpStatus,
  Query,
  UseGuards,
  // UsePipes,
  // ValidationPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { SearchService } from './search.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { searchType } from 'src/constants';
import { SearchQueryDto } from './dto/search-query.dto';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Search for posts and users' })
  @ApiOkResponse({ description: 'Get search successfully!!!' })
  @ApiBadRequestResponse({ description: 'Bad request. Check your input data' })
  @ApiQuery({
    name: 'key',
    required: true,
    description: 'Search keyword',
    type: String,
  })
  @ApiQuery({
    name: 'searchUser',
    required: false,
    description: 'Search by user name',
    enum: [searchType.USER],
  })
  @ApiQuery({
    name: 'searchPost',
    required: false,
    description: 'Search by post content',
    enum: [searchType.POST],
  })
  // @UsePipes(new ValidationPipe({ transform: true }))
  async search(@Query() query: SearchQueryDto) {
    try {
      const { key, searchUser, searchPost } = query;
      const result = await this.searchService.search(key, searchUser, searchPost);
      return {
        statusCode: HttpStatus.OK,
        message: 'Get search successfully',
        result,
      };
    } catch (error) {
      console.error('Error occurred:', error);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Search not found!',
        error: error.message,
      };
    }
  }
}
