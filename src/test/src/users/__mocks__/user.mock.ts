import { Response } from 'express';
import mongoose from 'mongoose';
import { ROLES } from '../../../../common/enums/role.enum';
import { UserRequest } from 'src/common/interfaces/userRequest.interfaces';

export const UserMock = {
  _id: new mongoose.Types.ObjectId(),
  username: 'test',
  email: 'test@test.com',
  password: 'passwordtest',
  role: ROLES.USER,
};

export const mockRequest = {
  user: { id: '123id' },
} as unknown as UserRequest;

export const UserMockRequest = {
  id: '126421674hdjsab',
  username: 'test',
  email: 'test@test.com',
  password: 'passwordtest',
  role: ROLES.USER,
};

export const UserMockUpdated = {
  username: 'test',
  email: 'test@test.com',
  password: 'passwordtest',
};

export const UserMockData = [
  {
    username: 'test',
    email: 'test@test.com',
    password: 'passwordtest',
    role: ROLES.USER,
  },
  {
    username: 'admin',
    email: 'admin@admin.com',
    password: 'passwordadmin',
    role: ROLES.ADMIN,
  },
];

export function newMockResponse(): Response {
  const response: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  return response as Response;
}
