import { Request } from 'express';
export interface UserRequest extends Request {
  user: {
    id: string;
    username: string;
    role: string;
  };
}
