import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePostDTO } from './dto/update-post.dto';
import { Post } from './schema/post.schema';
import { FilterPostsDto } from './dto/filter-post.dto';
import { SearchPostsDto } from './dto/search-post.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private readonly userServices: UsersService,
  ) {}

  async createPost({ body, userId, userName }) {
    const { title, content, category } = body;

    const user = await this.userServices.findById(userId);
    if (!(userName === user.username)) throw new UnauthorizedException();

    const postCreated = await this.postModel.create({
      title,
      author: userName,
      content,
      category,
      userId,
    });
    if (!postCreated) throw new BadRequestException();
    return { message: 'Post created successfully', id: postCreated._id };
  }

  async getAllPosts(page: string, limit: string): Promise<Post[]> {
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const skip = (pageInt - 1) * limitInt;
    const posts = await this.postModel.find().skip(skip).limit(limitInt).lean();
    if (!posts) throw new NotFoundException('No posts here');
    return posts;
  }

  async getPostById(id: string, userId: string) {
    const post = await this.postModel.findById(id).lean().exec();
    //BUSCA QUE SE COINCIDA EL ID DEL USUARIO
    if (!(post.userId.toString() === userId)) throw new UnauthorizedException();

    if (!post) throw new BadRequestException();
    return post;
  }

  async updatePost(
    idUser: string,
    id: string,
    body: UpdatePostDTO,
    userRole: string,
  ): Promise<object> {
    //BUSCA QUE SE COINCIDA EL ID DEL USUARIO
    const postUser: Post = await this.postModel.findById(id);
    if (!(idUser === postUser.userId.toString()) || !(userRole === 'admin')) {
      throw new UnauthorizedException();
    }

    const updatedPost = await this.postModel.findByIdAndUpdate(id, body).lean();
    if (!updatedPost) throw new NotFoundException('Post not founded');

    return { message: 'Post updated successfully', id: updatedPost._id };
  }

  async deletePost(
    idUser: string,
    id: string,
    userRole: string,
  ): Promise<object> {
    const postUser: Post = await this.postModel.findById(id);
    if (!(idUser === postUser.userId.toString()) || !(userRole === 'admin')) {
      throw new UnauthorizedException();
    }

    const postDeleted = await this.postModel.findByIdAndDelete(id);
    if (!postDeleted) throw new NotFoundException('Post not founded');

    return { message: 'Post deleted successfully', id: postDeleted._id };
  }

  async getPostByUserId(userId: string) {
    const posts = await this.postModel
      .find({ userId })
      .populate({
        path: 'userId',
        select: '_id',
      })
      .exec();
    if (!posts) {
      throw new NotFoundException();
    }
    return posts;
  }

  async searchPosts(searchPostsDto: SearchPostsDto) {
    const { title, page, limit } = searchPostsDto;

    if (!title || title === '') throw new NotFoundException('insert title');

    const results = await this.postModel
      .find({
        $or: [
          { title: { $regex: title, $options: 'i' } },
          { content: { $regex: title, $options: 'i' } },
        ],
      })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .lean();
    if (!results) {
      throw new NotFoundException('Posts not founded');
    }
    return results;
  }

  async getFilterPosts(filterDto: FilterPostsDto, id: string) {
    const { author, category } = filterDto;
    const postUser: Post = await this.postModel.findById(id).lean();

    if (!(postUser.userId.toString() === id)) throw new UnauthorizedException();

    if (author && category) {
      const result = await this.postModel.find({ author, category }).lean();
      if (!result) throw new BadRequestException();

      return result;
    } else if (category) {
      const result = await this.postModel.find({ category }).lean();
      if (!result) throw new BadRequestException();

      return result;
    } else if (author) {
      const result = await this.postModel.find({ author }).lean();
      if (!result) throw new BadRequestException();

      return result;
    }
  }
}
