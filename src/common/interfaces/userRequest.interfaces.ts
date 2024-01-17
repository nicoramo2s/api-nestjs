import { Request } from 'express';
export class UserRequest extends Request {
  user: {
    id: 'string';
    username: 'test';
    role: 'user';
  };
}
