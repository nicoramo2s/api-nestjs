import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get('/')
  welcome(@Res() res: Response) {
    return res.status(HttpStatus.OK).send('Welcome to Api Blog');
  }
}

