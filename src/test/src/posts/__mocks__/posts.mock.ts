import { Types } from 'mongoose';
import { ROLES } from 'src/common/enums/role.enum';
import { PostRequest } from 'src/common/interfaces/postRequest.interface';
import { SearchPostsDto } from 'src/posts/dto/search-post.dto';
import { PostDocument } from 'src/posts/schema/post.schema';

export const mockPost = {
  _id: new Types.ObjectId(),
  title: 'test',
  author: 'test',
  content: 'test',
  category: ['test'],
  userId: {
    _id: '655e078a81276db475f5e558',
    username: 'TEST',
    email: 'TEST@TEST.COM',
    password: 'TESTPASSWORD',
    role: ROLES.USER,
  },
  __v: 0,
};

export const messageSuccessfully = {
  message: 'Post updated successfully',
  id: new Types.ObjectId(),
};

export const mockRequest = {
  user: { id: '123id' },
} as unknown as PostRequest;

export const mockData = [
  {
    _id: new Types.ObjectId('655e078a81276db475f5e324'),
    title: 'test',
    author: 'test',
    content: 'test',
    category: ['test'],
    userId: {
      _id: '655e078a81276db475f5e324',
      username: 'test',
      email: 'test@test.com',
      password: 'testpassword',
      role: ROLES.ADMIN,
    },
    __v: 0,
  },
  {
    _id: new Types.ObjectId('655e078a81276db475f5e324'),
    title: 'test',
    author: 'test2',
    content: 'test2',
    category: ['test2'],
    userId: {
      _id: '655e078a81276db475f5e324',
      username: 'test2',
      email: 'test2@test2.com',
      password: 'testpassword',
      role: ROLES.USER,
    },
    __v: 0,
  },
  {
    _id: new Types.ObjectId('655e078a81276db475f5e324'),
    title: 'test',
    author: 'test3',
    content: 'test3',
    category: ['test3'],
    userId: {
      _id: '655e078a81276db475f5e324',
      username: 'test3',
      email: 'test3@test3.com',
      password: 'testpassword',
      role: ROLES.USER,
    },
    __v: 0,
  },
];

export const mockQuery: SearchPostsDto = {
  title: 'test',
  page: '1',
  limit: '10',
};
