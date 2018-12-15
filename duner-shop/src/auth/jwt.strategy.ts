import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './../models/user.DTO';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'iamhungry',
    });
  }
  async validate(payload: JwtPayload): Promise<UserDTO> {
    const user = await this.authService.validateUser(payload);

    if (!user) {
      throw new Error('Not authorized');
    }
    return user;
  }
}