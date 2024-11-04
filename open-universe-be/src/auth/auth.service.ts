import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { Auth } from './entities/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {}

  async signIn(res: Response, userName: string, password: string) {
    const user = await this.userService.findOneToLogin(userName);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong password');
    }

    const payload = { sub: user.id, username: user.userName, role: user.role };
    const access_token = await this.generateAccessToken({
      ...payload,
      type: process.env.JWT_ACCESS_KEY,
    });
    const refresh_token = await this.generateRefreshToken({
      ...payload,
      type: process.env.JWT_REFRESH_KEY,
    });

    const newAuth = new Auth();
    newAuth.user_id = user.id;
    newAuth.refresh_token = refresh_token;

    await this.authRepository.save(newAuth);

    res.cookie('access_token', access_token);
    res.cookie('refresh_token', refresh_token);
    return res.json({ message: 'Sign in successfully' });
  }

  async signUp(signUpDto: SignUpDto) {
    await this.userService.create(signUpDto);
    return { message: 'Sign up successfully!', status: 'success' };
  }

  async logout(req: Request, res: Response) {
    const token = req.cookies ? req.cookies['access_token'] : undefined;

    if (token === undefined) {
      throw new UnauthorizedException('You are not logged in yet!!!');
    }

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.json({ message: 'Logged out successfully' });
  }

  async generateAccessToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload, { expiresIn: '1d' });
  }

  async generateRefreshToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload, { expiresIn: '1d' });
  }

  async changeAccessToken(res: Response, req: Request) {
    console.log('refreshToken changed');

    const oldRefreshToken = req.cookies ? req.cookies['refresh_token'] : undefined;

    if (oldRefreshToken === undefined) {
      throw new UnauthorizedException('No token found');
    }

    const checkToken = await this.jwtService.verifyAsync(oldRefreshToken);
    if (!checkToken) {
      throw new HttpException('Refresh token is not valid!!!!', HttpStatus.BAD_REQUEST);
    }

    const auth = await this.authRepository.findOne({ where: { refresh_token: oldRefreshToken } });
    if (!auth) {
      throw new NotFoundException('Refresh token is not in database!!!!');
    }

    const decodedToken = this.jwtService.decode(oldRefreshToken);
    const payload = {
      sub: decodedToken.sub,
      username: decodedToken.username,
      role: decodedToken.role,
    };

    const access_token = await this.generateAccessToken({
      ...payload,
      type: process.env.JWT_ACCESS_KEY,
    });
    const refresh_token = await this.generateRefreshToken({
      ...payload,
      type: process.env.JWT_REFRESH_KEY,
    });

    auth.refresh_token = refresh_token;
    await this.authRepository.save(auth);

    res.cookie('access_token', access_token);
    res.cookie('refresh_token', refresh_token);

    return res.json({ message: 'Refresh successfully' });
  }
}
