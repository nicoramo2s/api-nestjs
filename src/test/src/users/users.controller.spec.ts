import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/users/schemas/user.schema';
import { UsersController } from '../../../users/users.controller';
import { UsersModule } from '../../../users/users.module';
import { UsersService } from '../../../users/users.service';
import {
  UserMock,
  UserMockRequest,
  UserMockUpdated,
  newMockResponse,
} from './__mocks__/user.mock';

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;
  let mockResponse = newMockResponse();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(jest.fn())
      .compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  describe('getUserById', () => {
    const userId = JSON.stringify(UserMock._id);

    it('should return user', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValue(UserMock);

      await userController.getUserById(userId, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        username: UserMock.username,
        email: UserMock.email,
        role: UserMock.role,
      });
    });

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValue(null);

      await expect(() =>
        userController.getUserById(userId, mockResponse),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('updateUser', () => {
    const userId = UserMockRequest.id;
    it('should update user and return successs message', async () => {
      jest.spyOn(userService, 'updateUser').mockResolvedValue(UserMock);

      await userController.updateUser(userId, UserMockUpdated, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'user updated successfully',
        userUpdated: {
          username: UserMock.username,
          email: UserMock.email,
          role: UserMock.role,
        },
      });
    });
    //* Caso de Error
    it('should throw NotFoundException when user is not found for update', async () => {
      jest.spyOn(userService, 'updateUser').mockResolvedValue(null);

      await expect(() =>
        userController.updateUser(userId, UserMockUpdated, mockResponse),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
