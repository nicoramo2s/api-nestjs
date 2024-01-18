export class UserRequest extends Request {
  user: {
    id: string;
    username: string;
    role: string;
  };
}
