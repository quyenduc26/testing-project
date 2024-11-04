import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Request')
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create add friend request' })
  @ApiCreatedResponse({ description: 'Request has been successfully sent' })
  @ApiBadRequestResponse({ description: 'Bad request. Check your input data' })
  @ApiNotFoundResponse({ description: 'Request not found' })
  async create(@Body() createRequestDto: CreateRequestDto, @Res() res) {
    try {
      await this.requestService.create(createRequestDto);
      return res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: 'Request has been successfully sent',
      });
    } catch (error) {
      return res.status(error.status).json({
        status: error.status,
        message: error.message,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get('pending/:id')
  @ApiOperation({ summary: 'Find all user ids waiting for friend requests' })
  async getPendingRequests(@Param('id') id: number) {
    return await this.requestService.getPendingRequests(id);
  }

  @UseGuards(AuthGuard)
  @Get('accept/:id')
  @ApiOperation({ summary: 'Find all user ids accepted friend requests ' })
  async getAcceptedRequests(@Param('id') id: number) {
    return await this.requestService.getAcceptedRequests(id);
  }

  @UseGuards(AuthGuard)
  @Patch('/confirm/:followerId')
  @ApiOperation({ summary: 'Accept friend request' })
  @ApiNotFoundResponse({ description: 'Request not found' })
  async update(@Param('followerId') followerId: number, @Res() res) {
    try {
      const userId = 1; // test confirm friend
      await this.requestService.update(userId, followerId);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Accept request fiend successfully',
      });
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: HttpStatus.NOT_FOUND, message: error.message });
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:followerId')
  @ApiOperation({ summary: 'Delete a request' })
  @ApiNotFoundResponse({ description: 'Request not found' })
  async remove(@Param('followerId') followerId: number, @Res() res): Promise<any> {
    const userId = 1; // test unfirend
    try {
      await this.requestService.remove(userId, followerId);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Delete a request successfully',
      });
    } catch (error) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ status: HttpStatus.NOT_FOUND, message: error.message });
    }
  }
}
