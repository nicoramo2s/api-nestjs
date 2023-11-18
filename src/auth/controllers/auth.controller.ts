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
import { Request, Response } from 'express';
import { CreateUserDTO } from 'src/users/dto/user.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
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
