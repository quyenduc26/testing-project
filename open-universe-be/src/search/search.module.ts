import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [UserModule, PostModule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
