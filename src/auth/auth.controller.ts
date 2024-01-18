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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserRequest } from 'src/common/interfaces/userRequest.interfaces';
import { AuthService } from './auth.service';
import { Register } from './dto/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Assign token to a user' })
  @ApiResponse({
    status: 200,
    description: 'Return a token jwt',
  })
  async login(@Req() req: UserRequest, @Res() res: Response) {
    const token = await this.authService.login(req.user);
    return res.status(HttpStatus.OK).json(token);
  }

  @Post('register')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 200,
    description: 'Return a message Created',
  })
  async register(@Body() register: Register, @Res() res: Response) {
    const newUser = await this.authService.register(register);
    if (!newUser) throw new NotFoundException();
    return res.status(HttpStatus.OK).json({
      message: 'created',
      newUser,
    });
  }
}
