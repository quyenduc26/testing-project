import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Response,
  Get,
  Res,
  Req,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('/')
@ApiTags('Authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @ApiOperation({ summary: 'Sign in' })
  @ApiCreatedResponse({ description: 'User has been successfully sign in' })
  @ApiBadRequestResponse({ description: 'Bad request. Check your input data' })
  signIn(@Response() res, @Body() signInDto: SignInDto) {
    return this.authService.signIn(res, signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiOperation({ summary: 'Sign up' })
  @ApiCreatedResponse({ description: 'User has been successfully sign up' })
  @ApiBadRequestResponse({ description: 'Bad request. Check your input data' })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('logout')
  @ApiOperation({ summary: 'Log out' })
  @ApiCreatedResponse({ description: 'User has been successfully log out' })
  @ApiBadRequestResponse({ description: 'Bad request. Check your request' })
  logout(@Req() req, @Res() res) {
    return this.authService.logout(req, res);
  }

  @HttpCode(HttpStatus.OK)
  @Get('refreshtoken')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiCreatedResponse({ description: 'User has been successfully sign in' })
  @ApiBadRequestResponse({ description: 'Bad request. Check your input data' })
  changeAccessToken(@Response() res, @Request() req) {
    return this.authService.changeAccessToken(res, req);
  }
}
