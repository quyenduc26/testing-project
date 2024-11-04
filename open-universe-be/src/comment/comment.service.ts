import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentResponseDTO } from './dto/response-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Comment } from './entities/comment.entity';
import { Post } from '../post/entities/post.entity';
import { ActiveStatus } from 'src/constants';
import {
  mapToAdminCommentResponseDTO,
  mapToClientCommentResponseDTO,
} from './helpers/mapToResponse';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  //CREATE
  async create(createCommentDto: CreateCommentDto): Promise<CommentResponseDTO> {
    const newComment = await this.mapToCommentDTO(createCommentDto);
    const savedComment = await this.commentRepository.save(newComment);
    return this.mapToCommentResponseDTO(savedComment);
  }

  // UPDATE COMMENT
  async update(
    postId: number,
    userId: number,
    updateCommentDto: Partial<UpdateCommentDto>,
  ): Promise<CommentResponseDTO> {
    const { content, mediaUrl, status } = updateCommentDto;
    const newComment = new Comment();
    newComment.content = content;
    newComment.media_url = mediaUrl;
    newComment.status = status;

    const updateResult = await this.commentRepository.update(
      { user_id: userId, post_id: postId },
      newComment,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException('Comment not found');
    }

    const updatedComment = await this.commentRepository.findOne({
      where: { user_id: userId, post_id: postId },
    });
    const ResponseCommentDTO = this.mapToCommentResponseDTO(updatedComment);
    return ResponseCommentDTO;
  }

  async updateStatus(id: number): Promise<CommentResponseDTO> {
    const comment = await this.commentRepository.findOne({ where: { id: id } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    comment.status =
      comment.status === ActiveStatus.ACTIVE ? ActiveStatus.INACTIVE : ActiveStatus.ACTIVE;
    await this.commentRepository.save(comment);
    return this.mapToCommentResponseDTO(comment);
  }

  async findAllComments(postId?: number): Promise<CommentResponseDTO[]> {
    try {
      if (postId) {
        console.log(postId);
        const commentsPost = await this.commentRepository.find({ where: { post_id: postId } });
        if (!commentsPost) {
          throw new NotFoundException('Comments not found');
        }
        const commentPromises = commentsPost.map((comment) =>
          this.mapToCommentResponseDTO(comment),
        );
        const data = await Promise.all(commentPromises);
        return data;
      }
      const comments = await this.commentRepository.find();
      const commentPromises = comments.map((comment) => this.mapToCommentResponseDTO(comment));
      const data = await Promise.all(commentPromises);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch comments');
    }
  }

  async findOne(id: number): Promise<CommentResponseDTO> {
    try {
      const comment = await this.commentRepository.findOne({
        where: { id: id },
        relations: { user: true },
      });

      if (!comment) {
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }

      return mapToAdminCommentResponseDTO(comment);
    } catch (error) {
      throw new Error('Failed to fetch comment');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }

  // CONVERSION FUNCTION
  async mapToCommentDTO(commentDto: CreateCommentDto) {
    const { userId, postId, content, mediaUrl } = commentDto;
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: {
        id: true,
        user_name: true,
        avatar: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    console.log(user, post);
    const newComment = new Comment();
    newComment.user_id = userId;
    newComment.post_id = postId;
    newComment.content = content;
    newComment.media_url = mediaUrl;
    newComment.user = user;
    newComment.post = post;
    return newComment;
  }

  async mapToCommentResponseDTO(comment: Comment) {
    const user = await this.userRepository.findOne({
      where: { id: comment.user_id },
      select: {
        id: true,
        full_name: true,
        avatar: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const ResponseCommentDTO = {
      id: comment.id,
      userId: comment.user_id,
      postId: comment.post_id,
      content: comment.content,
      mediaUrl: comment.media_url,
      status: comment.status,
      user: {
        id: user.id,
        userName: user.full_name,
        avatar: user.avatar,
      },
      createAt: comment.create_at,
    };
    return ResponseCommentDTO;
  }
}
