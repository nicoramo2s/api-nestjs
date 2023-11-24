import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schema/post.schema';
import { UpdatePostDTO } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async createPost({ body, userId, userName }) {
    const { title, content, categories } = body;
    const postCreated = await this.postModel.create({
      title,
      author: userName,
      content,
      categories,
      userId,
    });
    if (!postCreated) throw new BadRequestException();
    return { message: 'Post created successfully', id: postCreated._id };
  }

  async getAllPosts(page = 1, limit = 10): Promise<Post[]> {
    const skip = (page - 1) * limit;
    const posts = await this.postModel.find().skip(skip).limit(limit).exec();
    if (!posts || posts.length === 0)
      throw new NotFoundException('No posts here');
    return posts;
  }

  async getPostById(id: string) {
    const post = await this.postModel.findById(id).lean().exec();
    if (!post) throw new BadRequestException();
    return post;
  }

  async updatePost(
    usersId: string,
    id: string,
    body: UpdatePostDTO,
  ): Promise<object> {

    const post = await this.postModel.findById(id);
    const { userId } = post;
    const idString = userId.toString();
    if (usersId === idString) throw new BadRequestException();

    const updatedPost = await this.postModel.findByIdAndUpdate(id, body).lean();
    if (!updatedPost) throw new NotFoundException('Post not founded');

    return { message: 'Post updated successfully', id: updatedPost._id };
  }

  async deletePost(userId: string, id: string): Promise<object> {
    const post = await this.postModel.findById(id);
    const postId = post._id.toString();
    if (userId === postId) throw new BadRequestException();

    const postDeleted = await this.postModel.findByIdAndDelete(id);
    if (!postDeleted) throw new NotFoundException('Post not founded');

    return { message: 'Post deleted successfully', id: postDeleted._id };
  }

  async getPostUserId(userId: string) {
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
}
