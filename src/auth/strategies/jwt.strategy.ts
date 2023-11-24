import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from 'src/common/interfaces/passport.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'PALABRASECRETA',
    });
  }

  validate(payload: UserPayload) {
    return { id: payload.id, username: payload.username, role: payload.role };
  }
}
