import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserPayload } from 'src/common/interfaces/passport.interface';
import { CreateUserDTO } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { Register } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const userFounded = await this.userService.findByEmail(email);
    if (!userFounded) throw new NotFoundException();
    const isMatch = await bcrypt.compare(password, userFounded.password);
    if (!isMatch) throw new NotFoundException('Email or password incorrects');
    return userFounded;
  }

  async login(user: UserPayload) {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    }); //* el metodo sign firma con el jwt
  }

  async register(register: Register): Promise<any> {
    const user = await this.userService.findByEmail(register.email);
    if (user) throw new BadRequestException('the user exist');

    const hashedPassword = await bcrypt.hash(register.password, 10);
    const createUser = {
      username: register.username,
      email: register.email,
      password: hashedPassword,
    };
    await this.userService.createUser(createUser);
    return {
      username: createUser.username,
      email: createUser.email,
    };
  }
}
