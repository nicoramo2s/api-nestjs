import { Request } from 'express';
export interface PostRequest extends Request {
  user: {
    id: string;
    username: string;
    role: string;
  };
}
