import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';
import { searchType } from 'src/constants';

@Injectable()
export class SearchService {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  async search(key: string, searchUser?: searchType, searchPost?: searchType): Promise<any> {
    let users: any[] = [];
    let posts: any[] = [];

    if (searchUser || searchPost) {
      if (searchUser === searchType.USER) {
        users = await this.userService.searchUsers(key);
      }
      if (searchPost === searchType.POST) {
        posts = await this.postService.searchPosts(key);
      }
    } else {
      users = await this.userService.searchUsers(key);
      posts = await this.postService.searchPosts(key);
    }

    return {
      users,
      posts,
    };
  }
}
