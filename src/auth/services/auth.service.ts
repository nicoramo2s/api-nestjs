import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserNotPassword } from 'src/common/interfaces/register.interfaces';
import { CreateUserDTO } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserNotPassword | NotFoundException> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === password) {
      const { password, ...userDontPassword } = user;
      return userDontPassword;
    }
    return new NotFoundException();
  }

  login(user: any) {
    const payload = {
      email: user.email,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload), //* el metodo sign firma con el jwt
    };
  }

  async register(
    createUserDto: CreateUserDTO,
  ): Promise<UserNotPassword | Error> {
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) throw new BadRequestException('the user exist');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createUser = {
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    };
    await this.userService.createUser(createUser);
    return {
      username: createUser.username,
      email: createUser.email,
    };
  }
}
