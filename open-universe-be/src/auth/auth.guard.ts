import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies ? request.cookies['access_token'] : undefined;

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    try {
      await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new HttpException(
        {
          status: 419,
          message: 'Token expired or Token is wrong',
        },
        419,
      );
    }

    return true;
  }
}
