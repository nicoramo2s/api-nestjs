import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userServices: UsersService) {}

  @Get()
  async getAllUsers(@Res() res: Response) {
    const users = await this.userServices.findAll();
    if (!users) throw new NotFoundException('bad request');
    // Crear un nuevo arreglo sin la propiedad 'password'
    const usersNotPassword = users.map((objeto) => {
      const { password, ...usersSinPassword } = objeto;
      return usersSinPassword;
    });
    return res.status(HttpStatus.OK).json(usersNotPassword);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userServices.findById(id);
    if (!user) throw new NotFoundException('bad request');
    return res.status(HttpStatus.OK).json({
      username: user.username,
      email: user.email,
    });
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: CreateUserDTO,
    @Res() res: Response,
  ) {
    const user = await this.userServices.updateUser(id, body);
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

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userServices.deleteUserById(id);
    if (!user) throw new NotFoundException('bad delete');
    return res.status(HttpStatus.OK).json({
      message: 'user removed successfully',
      userRemoved: { username: user.username, email: user.email },
    });
  }
}
