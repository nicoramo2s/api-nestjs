import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from 'src/admin/admin.controller';
import { AdminModule } from 'src/admin/admin.module';
import { AdminService } from 'src/admin/admin.service';
import { PostsModule } from 'src/posts/posts.module';
import { Post } from 'src/posts/schema/post.schema';
import { User } from 'src/users/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';
import {
  UserMock,
  UserMockData,
  mockRequest,
  newMockResponse,
} from '../users/__mocks__/user.mock';
import { mockDataAdmin } from './__mocks__/admin.mock';

describe('AdminController', () => {
  let adminController: AdminController;
  let adminService: AdminService;
  let mockResponse = newMockResponse();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AdminModule, UsersModule, PostsModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(jest.fn())
      .overrideProvider(getModelToken(Post.name))
      .useValue(jest.fn())
      .compile();

    adminController = module.get<AdminController>(AdminController);
    adminService = module.get<AdminService>(AdminService);
  });

  describe('getAdminAllUsers', () => {
    it('should return all users', async () => {
      jest.spyOn(adminService, 'getAllUsers').mockResolvedValue(UserMockData);

      await adminController.getAdminAllUsers(mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(UserMockData);
    });
  });

  describe('getAdminAllPosts', () => {
    it('should return all posts', async () => {
      jest.spyOn(adminService, 'getAllPosts').mockResolvedValue(mockDataAdmin);

      await adminController.getAdminAllPosts('1', '10', mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockDataAdmin);
    });
  });

  describe('deleteUserWithAdmin', () => {
    it('should delete a user and return success message', async () => {
      jest.spyOn(adminService, 'deleteUserAdmin').mockResolvedValue(UserMock);

      await adminController.deleteUserWithAdmin(
        mockRequest.user.id,
        mockResponse,
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'user deleted',
        user: UserMock.username,
        email: UserMock.email,
      });
    });
  });
});
