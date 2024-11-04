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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: 'User has been successfully created' })
  @ApiBadRequestResponse({ description: 'Bad request. Check your input data' })
  create(@Body() createUserDto: CreateUserDto, @Res() res) {
    this.userService
      .create(createUserDto)
      .then(() => {
        return res.status(HttpStatus.CREATED).json({
          status: HttpStatus.CREATED,
          message: 'Success',
        });
      })
      .catch((err) => {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: HttpStatus.BAD_REQUEST,
          message: err.response.error,
        });
      });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Modify user' })
  @ApiOkResponse({ description: 'User status has been successfully updated' })
  @ApiBadRequestResponse({ description: 'Bad request. Check your input data' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('info/:id')
  @ApiOperation({ summary: 'Retrieve a user infor by id' })
  async getInfOfUser(@Res() res, @Param('id') id: string) {
    try {
      const data = await this.userService.getInfOfUser(+id);
      return res.status(HttpStatus.OK).json({
        message: "User's infor has been successfully retrieved",
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: User not retrieved!',
        error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id/requests')
  @ApiOperation({ summary: 'Retrieve all friend request of a user' })
  async getAllFriendRequest(@Param('id') id: number, @Res() res) {
    try {
      const data = await this.userService.getRequestUser(id);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Success',
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Users not retrieved!',
        error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  async findAll(@Res() res) {
    try {
      const users = await this.userService.findAll();
      return res.status(HttpStatus.OK).json({
        message: 'Users has been successfully retrieved',
        data: users,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Users not retrieved!',
        error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id/friends')
  @ApiOperation({ summary: 'Retrieve all friends of a user' })
  async getAllFriends(@Param('id') id: number, @Res() res) {
    try {
      const data = await this.userService.getAllFriends(id);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Success',
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Users not retrieved!',
        error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Get(':userId/:targetUserId')
  @ApiOperation({ summary: 'Retrieve a user by id' })
  async findOne(
    @Res() res,
    @Param('userId') userId: number,
    @Param('targetUserId') targetUserId: number,
  ) {
    try {
      const user = await this.userService.findOne(userId, targetUserId);
      return res.status(HttpStatus.OK).json({
        message: 'User has been successfully retrieved',
        user,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: User not retrieved!',
        error,
      });
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
