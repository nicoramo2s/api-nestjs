import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { Post } from 'src/posts/schema/post.schema';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.findAll();
    if (!users) throw new NotFoundException('dont search');
    return users;
  }

  async getAllPosts(page: string, limit: string): Promise<Post[]> {
    const posts = await this.postsService.getAllPosts(page, limit);
    if (!posts) throw new NotFoundException('dont search');
    return posts;
  }

  async deleteUserAdmin(id: string) {
    const user = this.usersService.deleteUserById(id);
    if (!user) throw new NotFoundException('dont delete');
    return user;
  }
}
