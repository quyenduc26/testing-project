import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('like')
@ApiTags('Like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new like' })
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.create(createLikeDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Find all likes' })
  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete a like' })  
  @Delete(':postId/:userId')
  remove(@Param('postId') postId: number, @Param('userId') userId: number) {
    return this.likeService.remove(postId, userId);
  }
}
