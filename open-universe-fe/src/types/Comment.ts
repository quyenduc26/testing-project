export interface Comment {
  id: number;
  userId: number;
  postId: number;
  content: string;
  mediaUrl?: string;
  isActive: boolean;
}

export type CommentResponse = Pick<Comment, 'id' | 'userId' | 'content' | 'mediaUrl'>;

export type CommentPayload = Omit<Comment, 'id' | 'isActive'>;

export type CommentAdminUpdatePayload = {
  id: number;
  content?: string;
  mediaUrl?: string;
  isActive?: boolean;
};

export type CommentClientResponse = {
  id: number;
  content: string;
  mediaUrl?: string;
  user: {
    id: number;
    userName: string;
    avatar: string;
  };
  createAt: string;
};

export type CommentAdminResponse = {
  id: number;
  content: string;
  media_url: string;
  status: string;
  user: {
    id: number;
    user_name: string;
    avatar: string;
  };
  createAt: string;
};
