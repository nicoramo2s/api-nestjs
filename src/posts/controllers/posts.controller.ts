import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreatePostDTO } from '../dto/create-post.dto';
import { UpdatePostDTO } from '../dto/update-post.dto';
import { PostsService } from '../services/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDTO, @Res() res: Response) {
    try {
      const newPost = await this.postsService.createPost(createPostDto);
      return res.status(HttpStatus.OK).json({
        posts: `was posted ${newPost.title}`,
        message: 'posts created successfully',
        newPost,
      });
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    const posts = await this.postsService.findAll();
    if (!posts) throw new BadRequestException('error when searching');
    return res.status(HttpStatus.OK).json(posts);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const post = await this.postsService.findOne(id);
    if (!post) throw new BadRequestException('error when searching');
    return res.status(HttpStatus.OK).json(post);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDTO,
    @Res() res: Response,
  ) {
    const postUpdated = await this.postsService.update(id, updatePostDto);
    if (!postUpdated) throw new BadRequestException('error when updated');
    return res.status(HttpStatus.OK).json({
      message: 'post updated successfully',
      postUpdated,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const postRemoved = await this.postsService.remove(id);
    if (!postRemoved)
      throw new BadRequestException('post removed successfully');
    return res.status(HttpStatus.OK).json({
      message: 'Post removed',
      postRemoved,
    });
  }
}
