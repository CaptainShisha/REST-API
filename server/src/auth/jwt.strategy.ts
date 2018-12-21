import { ConfigService } from 'src/config/config.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './../models/user.DTO';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService,
              private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.jwtSecret,
    });
  }
  async validate(payload: JwtPayload): Promise<UserDTO> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException('Not authorized', HttpStatus.FORBIDDEN);
    }
    return user;
  }
}