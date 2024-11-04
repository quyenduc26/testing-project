import { CommentClientResponse } from './Comment';

export interface Post {
  id: number;
  user_id: number;
  content?: string;
  media_url?: string;
  isActive: boolean;
}

export type PostResponse = Pick<Post, 'id' | 'user_id' | 'content' | 'media_url'>;

export type PostPayload = Omit<Post, 'id' | 'isActive'>;

export type PostAdminUpdatePayload = {
  id: number;
  content?: string;
  media_url?: string;
  status?: string;
};

export type PostClientResponse = {
  id: number;
  user_id: string;
  content: string;
  media_url: string;
  status?: number;
  user: {
    id: number;
    userName: string;
    avatar: string;
  };
  comments: CommentClientResponse[];
  createAt: string;
  commentCount: number;
};

export type PostAdminResponse = {
  id: number;
  content: string;
  media_url: string;
  status?: string;
  user: {
    id: number;
    userName: string;
    avatar: string;
  };
  likes: [];
  comments: CommentClientResponse[];
  time: string;
};
