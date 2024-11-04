import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ResponsePostDTO } from './dto/response-post.dto';
import { Post, PostWithCommentCount } from './entities/post.entity';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ResponseUserDTO } from 'src/user/dto/response-user.dto';
import { Comment } from 'src/comment/entities/comment.entity';
import { CommentResponseDTO } from 'src/comment/dto/response-comment.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  //CREATE
  async create(createPostDto: CreatePostDto): Promise<ResponsePostDTO> {
    const newPost = await this.mapToPostDTO(createPostDto);
    const createdPost = await this.postRepository.save(newPost);
    const ResponsePostDTO = this.mapToPostResponseDTO(createdPost);
    return ResponsePostDTO;
  }

  //GET ALL
  async findAll(): Promise<ResponsePostDTO[]> {
    const posts = (await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'commentUser')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .getMany()) as PostWithCommentCount[];

    for (let post of posts) {
      post.comments = post.comments.slice(-3);
    }

    const responseDTOs: ResponsePostDTO[] = posts.map((post) => this.mapToPostResponseDTO(post));
    return responseDTOs;
  }

  //GET ONE
  async findOne(id: number): Promise<ResponsePostDTO | null> {
    const post: Post | null = await this.postRepository.findOne({
      where: { id: id },
      relations: {
        user: true,
      },
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const responseDTO = this.mapToPostResponseDTO(post);
    return responseDTO;
  }

  //UPDATE
  async update(id: number, updatePostDto: UpdatePostDto) {
    const { user_id, content, media_url, status } = updatePostDto;
    const newTemporaryPostData = new Post();
    newTemporaryPostData.user_id = user_id;
    newTemporaryPostData.content = content;
    newTemporaryPostData.media_url = media_url;
    newTemporaryPostData.status = status;
    const updatingPost = await this.postRepository.update(id, newTemporaryPostData);
    if (!updatingPost) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }

  //REMOVE
  async remove(id: number) {
    const post = await this.postRepository.findOne({ where: { id: id } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    post.is_destroyed = true;
    await this.postRepository.save(post);
  }

  async searchPosts(q: string): Promise<ResponsePostDTO[]> {
    const posts = await this.postRepository.find({
      where: [{ content: Like(`%${q}%`) }],
      relations: {
        user: true,
      },
    });

    if (posts.length === 0 || !posts) {
      return [];
    }
    return posts.map((post) => this.mapToPostResponseDTO(post));
  }

  //CONVERSION FUNCTION
  async mapToPostDTO(postDTO: CreatePostDto) {
    const { user_id, content, media_url } = postDTO;
    const user = await this.userRepository.findOne({
      where: { id: user_id },
      select: {
        id: true,
        user_name: true,
        avatar: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newPost = new Post();
    newPost.user_id = user_id;
    newPost.content = content;
    newPost.media_url = media_url || '';
    newPost.user = user;
    return newPost;
  }

  mapToPostResponseDTO(post: PostWithCommentCount) {
    const user = post.user ? this.mapToUserPostResponse(post.user) : null;

    let responsePostDTO: ResponsePostDTO = {
      id: post.id,
      user_id: post.user_id,
      content: post.content,
      media_url: post.media_url,
      status: post.status,
      user: user,
      createAt: post.create_at,
    };

    if (post.comments) {
      const comments = post.comments.map((comment) => this.mapToCommentPostResponse(comment));
      responsePostDTO = {
        ...responsePostDTO,
        comments: comments,
        commentCount: post.commentCount,
      };
    }

    return responsePostDTO;
  }

  mapToUserPostResponse(user: User) {
    const UserPostResponse: ResponseUserDTO = {
      id: user.id,
      userName: user.full_name,
      avatar: user.avatar,
    };
    return UserPostResponse;
  }

  mapToCommentPostResponse(comment: Comment) {
    const CommentPostResponse: CommentResponseDTO = {
      id: comment.id,
      user: {
        id: comment.user.id,
        userName: comment.user.full_name,
        avatar: comment.user.avatar,
      },
      content: comment.content,
      mediaUrl: comment.media_url,
      createAt: comment.create_at,
    };
    return CommentPostResponse;
  }
}
