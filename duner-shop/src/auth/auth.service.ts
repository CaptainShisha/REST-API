import { UserDTO } from './../models/user.DTO';
import { UsersService } from './../users/user.service';
import { JwtPayload } from './interfaces/jwt-payload';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService) { }

    public async signIn(user: UserDTO): Promise<string> {
      const userFound: UserDTO = await this.usersService.signIn(user);
      if (userFound) {
        return this.jwtService.sign({ username: userFound.username, isAdmin: userFound.isAdmin });
      } else {
        return null;
      }
    }
    async validateUser(payload: JwtPayload): Promise<UserDTO> {
      return await this.usersService.validateUser(payload);
    }

}