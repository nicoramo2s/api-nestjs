import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidateToken {
  constructor(private jwt: JwtService) {}

  validateToken(token: string) {
    return this.jwt.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }
}
