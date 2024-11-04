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
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiOperation,
  ApiTags,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('post')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  async create(@Body() createPostDto: CreatePostDto, @Res() res) {
    try {
      const post = await this.postService.create(createPostDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Post has been successfully created',
        post,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Post not created!',
        error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiOkResponse({ description: 'Get post by ID successfully!!!' })
  async findAll(@Res() res) {
    try {
      const posts = await this.postService.findAll();
      return res.status(HttpStatus.OK).json({
        message: 'Get all Posts have been successfully',
        posts,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Unable to fetch posts',
        error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID' })
  @ApiOkResponse({ description: 'Get post by ID successfully!!!' })
  @ApiBadRequestResponse({ description: 'Bad request. Post not found!.' })
  async getPostById(@Res() res, @Param('id') id: number) {
    try {
      const post = await this.postService.findOne(id);
      return res.status(HttpStatus.OK).json({
        message: 'Get post by ID successfully!!!',
        post,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Post not found!',
      });
    }
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update a post' })
  async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @Res() res) {
    try {
      const updatingPost = await this.postService.update(id, updatePostDto);
      return res.status(HttpStatus.OK).json({
        message: 'Post has been successfully updated',
        post: updatingPost,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Post not updated!',
        error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiNoContentResponse({ description: 'Post deleted successfully' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  async remove(@Res() res, @Param('id') id: number): Promise<any> {
    try {
      await this.postService.remove(id);
      return res.status(HttpStatus.NO_CONTENT).json({
        message: 'Post deleted successfully',
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Post not found',
      });
    }
  }
}
