import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { ChatboxModule } from './chatbox/chatbox.module';
import { AddressModule } from './address/address.module';
import { RequestModule } from './request/request.module';
import { MessagesModule } from './messages/messages.module';
import { LikeModule } from './like/like.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot(dataSourceOptions),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    PostModule,
    CommentModule,
    ChatboxModule,
    AddressModule,
    AuthModule,
    RequestModule,
    MessagesModule,
    LikeModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
