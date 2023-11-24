import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostRequest } from 'src/common/interfaces/postRequest.interface';
import { UserRequest } from 'src/common/interfaces/userRequest.interfaces';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(
    @Req() req: PostRequest,
    @Body() body: CreatePostDTO,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.id;
      const userName = req.user.username;
      const data = await this.postsService.createPost({
        body,
        userId,
        userName,
      });
      return res.status(HttpStatus.CREATED).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getAllPosts(
    @Query('page', new ParseIntPipe()) page: number = 1,
    @Query('limit', new ParseIntPipe()) limit: number = 10,
    @Res() res: Response,
  ) {
    try {
      const data = await this.postsService.getAllPosts(page, limit);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.postsService.getPostById(id);
      return res.status(HttpStatus.OK).json({ data });
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  async updatePost(
    @Param('id') id: string,
    @Req() req: UserRequest,
    @Body() body: UpdatePostDTO,
    @Res() res: Response,
  ) {
    try {
      const usersId = req.user.id;
      const data = await this.postsService.updatePost(usersId, id, body);
      res.status(HttpStatus.CREATED).json({ data });
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  async deleteUser(
    @Req() req: PostRequest,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const data = await this.postsService.deletePost(req.user.id, id);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Get('/user/:userId')
  async getPostByUser(@Param('userId') userId, @Res() res: Response) {
    try {
      const data = await this.postsService.getPostUserId(userId);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }
}
