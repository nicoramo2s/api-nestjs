import {
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserRequest } from 'src/common/interfaces/userRequest.interfaces';
import { CreateUserDTO } from 'src/users/dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: UserRequest) {
    const token = this.authService.login(req.user);
    return token;
  }

  @Post('register')
  async register(@Body() createUserDTO: CreateUserDTO, @Res() res: Response) {
    const newUser = await this.authService.register(createUserDTO);
    if (!newUser) throw new NotFoundException();
    return res.status(HttpStatus.OK).json({
      message: 'created',
      newUser,
    });
  }
}
