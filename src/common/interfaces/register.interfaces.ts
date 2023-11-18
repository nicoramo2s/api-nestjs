import { Post } from 'src/posts/schema/post.schema';
import { ROLES } from '../enums/role.enum';

export interface UserNotPassword {
  username: string;
  email: string;
}
