import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Comment')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiCreatedResponse({ description: 'Comment has been successfully created' })
  @ApiBadRequestResponse({ description: 'Bad request. Check your input data' })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':postId/:userId')
  @ApiOperation({ summary: 'Update a new comment' })
  @ApiCreatedResponse({ description: 'Comment has been successfully updated' })
  @ApiBadRequestResponse({ description: 'Bad request. Check your input data' })
  update(
    @Param('postId') postId: number,
    @Param('userId') userId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.update(postId, +userId, updateCommentDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiQuery({ name: 'postId', required: false })
  async findAllComments(@Query('postId') postId: number, @Res() res) {
    try {
      const comments = await this.commentService.findAllComments(postId);
      return res.status(HttpStatus.OK).json({
        message: 'Comments has been successfully retrieved',
        data: comments,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Comments not retrieved!',
        error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res) {
    try {
      const comment = await this.commentService.findOne(id);
      return res.status(HttpStatus.OK).json({
        message: 'Comment has been successfully retrieved',
        comment,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Comment not retrieved!',
        error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a new comment status' })
  async updateStatus(@Param('id') id: number, @Res() res) {
    try {
      const comment = await this.commentService.updateStatus(id);
      return res.status(HttpStatus.OK).json({
        message: 'Comment has been successfully updated',
        comment,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Comment not updated!',
        error,
      });
    }
  }
}
