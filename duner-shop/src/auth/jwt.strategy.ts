import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/models/user.DTO';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'iamhungry',
    });
  }
  validate(payload: JwtPayload): UserDTO {
    const user = this.authService.validateUser(payload);

    return user;
  }
}