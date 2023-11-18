import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDTO } from '../dto/create-post.dto';
import { UpdatePostDTO } from '../dto/update-post.dto';
import { Post as Posts } from '../schema/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts.name) private readonly postModel: Model<Posts>,
  ) {}

  createPost(createPostDto: CreatePostDTO): Promise<Posts> {
    const newPost = new this.postModel(createPostDto);
    if (!newPost) throw new NotFoundException('could not be created');
    return newPost.save();
  }

  findAll(): Promise<Posts[]> {
    const posts = this.postModel.find().exec();
    if (!posts) throw new NotFoundException('It was not possible to search');
    return posts;
  }

  findOne(id: string): Promise<Posts> {
    const posts = this.postModel.findById(id);
    if (!posts) throw new NotFoundException('I dont know in');
    return posts;
  }

  update(id: string, updatePostDto: UpdatePostDTO): Promise<Posts> {
    const updatePosts = this.postModel.findByIdAndUpdate(id, updatePostDto, {
      new: true,
    });
    if (!updatePosts) throw new NotFoundException('could not be updated');
    return updatePosts;
  }

  remove(id: string): Promise<Posts> {
    const postRemoved = this.postModel.findById(id);
    if (!postRemoved) throw new NotFoundException('could not be deleted');
    return postRemoved;
  }
}
