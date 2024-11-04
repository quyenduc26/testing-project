import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Auth } from './entities/auth.entity';
import { RequestService } from 'src/request/request.service';
import { Request } from 'src/request/entities/request.entity';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_ACCESS_KEY}`,
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Auth]),
    TypeOrmModule.forFeature([Request]),
  ],
  providers: [AuthService, UserService, RequestService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
