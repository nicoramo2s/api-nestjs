import { HttpStatus } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FilterPostsDto } from 'src/posts/dto/filter-post.dto';
import { PostsController } from 'src/posts/posts.controller';
import { PostsModule } from 'src/posts/posts.module';
import { PostsService } from 'src/posts/posts.service';
import { Post } from 'src/posts/schema/post.schema';
import { User } from 'src/users/schemas/user.schema';
import { UsersModule } from 'src/users/users.module';
import { newMockResponse } from '../users/__mocks__/user.mock';
import {
  messageSuccessfully,
  mockData,
  mockPost,
  mockQuery,
  mockRequest,
} from './__mocks__/posts.mock';

describe('PostsController', () => {
  let postController: PostsController;
  let postService: PostsService;
  const mockResponse = newMockResponse();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PostsModule, UsersModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(jest.fn())
      .overrideProvider(getModelToken(Post.name))
      .useValue(jest.fn())
      .compile();

    postController = module.get<PostsController>(PostsController);
    postService = module.get<PostsService>(PostsService);
  });

  describe('getAllPosts', () => {
    it('should return an array of posts', async () => {
      jest.spyOn(postService, 'getAllPosts').mockResolvedValue(mockData);
      await postController.getAllPosts('1', '10', mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
  });

  describe('getPostById', () => {
    it('get a post wich match with the id', async () => {
      jest.spyOn(postService, 'getPostById').mockResolvedValue(mockPost);
      await postController.getPostById('id', mockResponse, mockRequest);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      jest
        .spyOn(postService, 'createPost')
        .mockResolvedValue(messageSuccessfully);

      await postController.createPost(mockRequest, mockPost, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(messageSuccessfully);
    });
  });

  describe('updatePost', () => {
    const id = mockRequest.user.id;
    it('should be update a post', async () => {
      jest
        .spyOn(postService, 'updatePost')
        .mockResolvedValue(messageSuccessfully);
      await postController.updatePost(id, mockRequest, mockPost, mockResponse);
      expect(mockResponse.status(200));
      expect(mockResponse.json).toHaveBeenCalledWith(messageSuccessfully);
    });
    describe('deletePost', () => {
      it('should be update a post', async () => {
        jest
          .spyOn(postService, 'deletePost')
          .mockResolvedValue(messageSuccessfully);
        await postController.deleteUserPost(mockRequest, 'id', mockResponse);
        expect(mockResponse.status(200));
        expect(mockResponse.json).toHaveBeenCalledWith(messageSuccessfully);
      });
    });

    describe('searchPost', () => {
      it('return posts based in provided query', async () => {
        jest.spyOn(postService, 'searchPosts').mockResolvedValue(mockData);
        await postController.searchPost(mockQuery, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockData);
      });
    });

    describe('filterPost', () => {
      it('should filter posts', async () => {
        const filterDto: FilterPostsDto = {
          author: 'testAuthor',
          category: 'testCategory',
        };
        jest.spyOn(postService, 'getFilterPosts').mockResolvedValue(mockData);
        await postController.filterPost(filterDto, mockResponse, mockRequest);

        expect(postService.getFilterPosts).toHaveBeenCalledWith(
          filterDto,
          mockRequest.user.id,
        );
        expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
        expect(mockResponse.json).toHaveBeenCalledWith(mockData);
      });
    });
  });
});
