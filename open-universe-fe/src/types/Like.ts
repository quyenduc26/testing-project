export interface Like {
  user_id: number;
  post_id: number;
  followed_at: Date;
}

export type LikeResponse = Like;

export type LikePayload = Omit<Like, 'followed_at'>;
