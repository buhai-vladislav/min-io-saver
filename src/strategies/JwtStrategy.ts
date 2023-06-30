import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IJwtPayload } from 'src/types/JwtPayload';
import { User } from 'src/db/models/User';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET || 'SECRET',
    });
  }

  async validate(payload: IJwtPayload) {
    const { userId } = payload;

    const response = await User.findOne({ where: { id: userId } });

    if (!response) {
      throw new UnauthorizedException();
    }

    const user = { userId: payload.userId, email: payload.email };

    return user;
  }
}
