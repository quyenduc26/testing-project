import { Comment } from '../entities/comment.entity';
import { CommentResponseDTO } from '../dto/response-comment.dto';

export const mapToAdminCommentResponseDTO = (comment: Comment): CommentResponseDTO => {
  return {
    id: comment.id,
    userId: comment.user_id,
    postId: comment.post_id,
    content: comment.content,
    mediaUrl: comment.media_url,
    status: comment.status,
    user: {
      id: comment.user.id,
      userName: comment.user.user_name,
      avatar: comment.user.avatar,
    },
  };
};

export const mapToClientCommentResponseDTO = (comment: Comment): CommentResponseDTO => {
  return {
    id: comment.id,
    userId: comment.user_id,
    content: comment.content,
    mediaUrl: comment.media_url,
    user: {
      id: comment.user.id,
      userName: comment.user.user_name,
      avatar: comment.user.avatar,
    },
  };
};
