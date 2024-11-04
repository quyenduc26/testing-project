import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Like } from './entities/like.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Like) private likeRepository: Repository<Like>
  ) { }

  async create(createLikeDto: CreateLikeDto) {
    try {
      const { user_id, post_id } = createLikeDto;

      const user = await this.userRepository.findOne({ where: { id: user_id } });
      const post = await this.postRepository.findOne({ where: { id: post_id } });
      if (!user) {
        throw new NotFoundException("User does not found!!!");
      } else if (!post) {
        throw new NotFoundException("Post does not found!!!");
      }

      const like = await this.likeRepository.findOne({ where: { user_id: user_id, post_id: post_id } });

      if (like) {
        throw new Error("Already like!!!");
      }

      const newLike = new Like();
      newLike.user_id = user_id;
      newLike.post_id = post_id;

      await this.likeRepository.save(newLike);

      return { message: "Like successfully!!!" };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const likes = await this.likeRepository.find();
      return {listLike: likes}
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(postId: number, userId: number) {
    try {
      const like = await this.likeRepository.findOne({ where: { user_id: userId, post_id: postId } });
      if (!like) {
        throw new NotFoundException("This like does not found!!!")
      }

      await this.likeRepository.remove(like);
      return {message: "Delete successfully!!!"}
    } catch (error) {
      throw new Error(error);
    }
  }
}