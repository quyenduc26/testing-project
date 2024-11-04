export interface Request {
  userId: number;
  followerId: number;
  status: string;
}

export type RequestPayload = Request;
