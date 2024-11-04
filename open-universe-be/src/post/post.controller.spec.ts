import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ResponsePostDTO } from './dto/response-post.dto';
import { HttpStatus } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
// import { UpdatePostDto } from './dto/update-post.dto';
// import { ActiveStatus } from 'src/constants';
import { Timestamp } from 'bson';

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;
  let postRepository: Repository<Post>;
  let userRepository: Repository<User>;

  beforeEach(() => {
    service = new PostService(postRepository, userRepository);
    controller = new PostController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const createPostDto: CreatePostDto = {
        user_id: 1,
        content: 'Good post',
        media_url: 'https://dribbble.com/shots/19942482-Comet',
      };

      const createdPost = { id: 1, ...createPostDto } as ResponsePostDTO;

      jest.spyOn(service, 'create').mockResolvedValue(createdPost);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.create(createPostDto, res);

      expect(service.create).toHaveBeenCalledWith(createPostDto);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Post has been successfully created',
        post: createdPost,
      });
    });

    it('should return an error if creation fails', async () => {
      const createPostDto: CreatePostDto = {
        user_id: 1,
        content: 'Test content',
        media_url: 'http://example.com',
      };

      jest.spyOn(service, 'create').mockRejectedValue(new Error('Error creating post'));

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.create(createPostDto, res);

      expect(service.create).toHaveBeenCalledWith(createPostDto);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Post not created!',
        error: new Error('Error creating post'),
      });
    });
  });

  describe('findAll', () => {
    it('should return all posts', async () => {
      const posts: ResponsePostDTO[] = [
        {
          id: 1,
          user_id: 1,
          content: 'Test content',
          media_url: 'http://example.com',
          status: 'active',
          createAt: new Timestamp(BigInt(1)),
          user: { id: 1, userName: 'Huyen' },
          comments: [],
          commentCount: 0,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(posts);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.findAll(res);

      expect(service.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Get all Posts have been successfully',
        posts,
      });
    });

    it('should return an error if fetching posts fails', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new Error('Error fetching posts'));

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.findAll(res);

      expect(service.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Unable to fetch posts',
        error: new Error('Error fetching posts'),
      });
    });
  });

  describe('remove', () => {
    it('should delete a post', async () => {
      const postId = 1;

      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.remove(res, postId);

      expect(service.remove).toHaveBeenCalledWith(postId);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Post deleted successfully',
      });
    });

    it('should return an error if post not found', async () => {
      const postId = 1;

      jest.spyOn(service, 'remove').mockRejectedValue(new Error('Post not found'));

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.remove(res, postId);

      expect(service.remove).toHaveBeenCalledWith(postId);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Post not found',
      });
    });
  });
});
