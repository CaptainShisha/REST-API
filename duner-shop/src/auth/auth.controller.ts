import { UserDTO } from './../models/user.DTO';
import { UsersService } from './../users/user.service';
import { AuthService } from './auth.service';
import { Controller, Post, Body, BadRequestException, ValidationPipe } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    private readonly usersService: UsersService) { }

  @Post('login')
  async sign(@Body(new ValidationPipe ({
    transform: true,
    whitelist: true,
  })) user: UserDTO): Promise<string> {
    const token = await this.authService.signIn(user);
    if (!token) {
      throw new BadRequestException('Wrong credentials!');
    }

    return token;
  }
}