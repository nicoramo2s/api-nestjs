import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ROLES } from 'src/common/enums/role.enum';
import { AdminService } from './admin.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles(ROLES.ADMIN)
  @Get('users')
  async getAdminAllUsers(@Res() res: Response) {
    try {
      const dataUsers = await this.adminService.getAllUsers();
      return res.status(HttpStatus.OK).json(dataUsers);
    } catch (error) {
      throw error;
    }
  }
  @Roles(ROLES.ADMIN)
  @Get('posts')
  async getAdminAllPosts(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Res() res: Response,
  ) {
    try {
      const dataPosts = await this.adminService.getAllPosts(page, limit);
      return res.status(HttpStatus.OK).json(dataPosts);
    } catch (error) {
      throw error;
    }
  }

  @Roles(ROLES.ADMIN)
  @Delete('users/:id')
  async deleteUserWithAdmin(@Param('id') id: string, @Res() res: Response) {
    try {
      const deletedUser = await this.adminService.deleteUserAdmin(id);
      return res.status(HttpStatus.OK).json({
        message: 'user deleted',
        user: deletedUser.username,
        email: deletedUser.email,
      });
    } catch (error) {
      throw error;
    }
  }
}
