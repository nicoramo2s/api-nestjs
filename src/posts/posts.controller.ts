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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('posts')
@Roles(ROLES.USER)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({
    summary: 'List all posts',
  })
  @ApiResponse({
    status: 200,
    description: 'Return a posts list',
  })
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
  @ApiOperation({ summary: 'Filter posts by category and author' })
  @ApiResponse({
    status: 200,
    description: 'Filter posts by author and category',
  })
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
  @ApiOperation({
    summary: 'Search for posts by title, content, author',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the posts that match the search parameters',
  })
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
  @ApiOperation({ summary: 'View details of a specific post' })
  @ApiResponse({
    status: 200,
    description: 'Returns a post by id',
  })
  async getPostById(
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
  @ApiOperation({ summary: 'you get the posts from a specific user' })
  @ApiResponse({
    status: 200,
    description: 'Returns a post by userId',
  })
  async getPostByUser(@Param('userId') userId: string, @Res() res: Response) {
    try {
      const data = await this.postsService.getPostByUserId(userId);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'Return new post',
  })
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

  @Roles(ROLES.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({
    status: 200,
    description: 'Updated post with id',
  })
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

  @Roles(ROLES.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({
    status: 200,
    description: 'Delete post with id',
  })
  async deleteUserPost(
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
