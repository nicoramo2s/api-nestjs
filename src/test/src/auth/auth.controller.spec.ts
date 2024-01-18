import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/auth/auth.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/schemas/user.schema';
import { UserMock, newMockResponse } from '../users/__mocks__/user.mock';
import { AuthMock, mockToken, req } from './__mocks__/auth.mock';

jest.mock('../../../auth/auth.service.ts');
jest.mock('../../../auth/strategies/jwt.strategy.ts');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  const mockResponse = newMockResponse();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .overrideProvider(getModelToken(User.name))
      .useValue(jest.fn())
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('Login', () => {
    it('should return a token JWT', async () => {
      jest.spyOn(authService, 'login').mockResolvedValue(mockToken);
      await authController.login(req, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockToken);
    });
  });

  describe('Register', () => {
    it('should register a user successfully', async () => {
      jest.spyOn(authService, 'register').mockResolvedValue(UserMock);

      await authController.register(AuthMock, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'created',
        newUser: UserMock,
      });
    });
    it('should throw NotFoundException when user registration fails', async () => {
      jest.spyOn(authService, 'register').mockResolvedValue(null);

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await expect(() =>
        authController.register(null, res),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
