import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ROLES } from 'src/common/enums/role.enum';
import { PostRequest } from 'src/common/interfaces/postRequest.interface';
import { CreatePostDTO } from './dto/create-post.dto';
import { FilterPostsDto } from './dto/filter-post.dto';
import { SearchPostsDto } from './dto/search-post.dto';
import { UpdatePostDTO } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Roles(ROLES.USER, ROLES.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Res() res: Response,
  ) {
    try {
      const data = await this.postsService.getAllPosts(page, limit);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Get('/filter')
  async filterPost(
    @Query() query: FilterPostsDto,
    @Res() res: Response,
    @Req() req: PostRequest,
  ) {
    try {
      const result = await this.postsService.getFilterPosts(query, req.user.id);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw error;
    }
  }

  @Get('/search')
  async searchPost(
    @Query() { title, page = '1', limit = '10' }: SearchPostsDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.postsService.searchPosts({
        title,
        page,
        limit,
      });
      return res.status(HttpStatus.OK).json({ result });
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: PostRequest,
  ) {
    try {
      const data = await this.postsService.getPostById(id, req.user.id);
      return res.status(HttpStatus.OK).json({ data });
    } catch (error) {
      throw error;
    }
  }

  @Get('/user/:userId')
  async getPostByUser(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const data = await this.postsService.getPostByUserId(userId);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }

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

  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Req() req: PostRequest,
    @Body() body: UpdatePostDTO,
    @Res() res: Response,
  ) {
    try {
      const userRole = req.user.role;
      const usersId = req.user.id;
      const data = await this.postsService.updatePost(
        usersId,
        id,
        body,
        userRole,
      );
      res.status(HttpStatus.CREATED).json({ data });
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteUser(
    @Req() req: PostRequest,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const userRole = req.user.role;
      const userId = req.user.id;
      const data = await this.postsService.deletePost(userId, id, userRole);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }
}
