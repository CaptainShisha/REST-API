import { UsersService } from './../users/user.service';
import { JwtPayload } from './interfaces/jwt-payload';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/models/user.DTO';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService) { }

  async sign(payload: JwtPayload): Promise<string> {
    return await this.jwtService.sign(payload);
  }

 validateUser(payload: JwtPayload): UserDTO {
    return this.usersService.validateUser(payload);
  }

}