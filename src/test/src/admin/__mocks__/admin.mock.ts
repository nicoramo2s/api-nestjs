import mongoose from 'mongoose';
import { ROLES } from 'src/common/enums/role.enum';

export const mockDataAdmin = [
  {
    _id: new mongoose.Types.ObjectId(),
    author: 'test',
    category: ['test'],
    content: 'test',
    title: 'test',
    userId: {
      _id: new mongoose.Types.ObjectId(),
      email: 'test@test.com',
      password: 'passwordtest',
      role: ROLES.USER,
      username: 'test',
    },
  },
  {
    _id: new mongoose.Types.ObjectId(),
    author: 'test2',
    category: ['test2'],
    content: 'test2',
    title: 'test2',
    userId: {
      _id: new mongoose.Types.ObjectId(),
      email: 'test@test.com',
      password: 'passwordtest',
      role: ROLES.USER,
      username: 'test',
    },
  },
];
