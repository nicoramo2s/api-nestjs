import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from '../dto/user.dto';
import { User } from '../schemas/user.schema';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  findAll(): Promise<User[]> {
    const users = this.userModel.find().lean();
    if (!users) throw new NotFoundException('It was not possible to search');
    return users;
  }

  async createUser(createUserDto: CreateUserDTO): Promise<User> {
    const newUser = await this.userModel.create(createUserDto);
    return newUser.save();
  }

  findById(id: string): Promise<User> {
    const user = this.userModel.findById(id).lean();
    if (!user) throw new NotFoundException('I dont know in');
    return user;
  }

  deleteUserById(id: string): Promise<User> {
    const userDelete = this.userModel.findByIdAndRemove(id).lean();
    if (!userDelete) throw new NotFoundException('could not be deleted');
    return userDelete;
  }

  updateUser(id: string, body: CreateUserDTO): Promise<User> {
    const userUpdate = this.userModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!userUpdate) throw new NotFoundException('could not be updated');
    return userUpdate;
  }

  findByEmail(email: string): Promise<User> {
    const user = this.userModel.findOne({ email }).lean();
    return user;
  }
}
