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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Login, Register } from './dto/auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { UserRequest } from 'src/common/interfaces/userRequest.interfaces';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Assign token to a user' })
  @ApiBody({ type: Login })
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
