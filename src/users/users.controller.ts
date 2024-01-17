import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ROLES } from 'src/common/enums/role.enum';
import { CreateUserDTO } from './dto/user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @Roles(ROLES.USER)
  @Get(':id')
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    const user = await this.usersServices.findById(id);
    if (!user) throw new NotFoundException('bad request');
    return res.status(HttpStatus.OK).json({
      username: user.username,
      email: user.email,
      role: user.role
    });
  }

  @Roles(ROLES.USER, ROLES.ADMIN)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: CreateUserDTO,
    @Res() res: Response,
  ) {
    const user = await this.usersServices.updateUser(id, body);
    if (!user) throw new NotFoundException('bad update');
    return res.status(HttpStatus.OK).json({
      message: 'user updated successfully',
      userUpdated: {
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  }
}
