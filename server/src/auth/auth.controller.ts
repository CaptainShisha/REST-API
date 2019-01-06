import { UserRegisterDTO } from 'src/models/user-register.DTO';
import { AuthGuard } from '@nestjs/passport';
import { UserDTO } from './../models/user.DTO';
import { UsersService } from './../users/user.service';
import { AuthService } from './auth.service';
import { Controller, Post, Get, Body, BadRequestException, ValidationPipe, UseGuards, Req, Delete, HttpException, HttpStatus } from '@nestjs/common';

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

    return JSON.stringify(token);
  }

  @Get('profile')
  @UseGuards(AuthGuard())
  async getProfile(@Req() req): Promise<UserRegisterDTO> {
    return await this.usersService.getByUsername(req.user.username);
  }

  @Delete ('profile')
  @UseGuards(AuthGuard())
  async deleteProfile(@Req() req){
    try {
      const userFound = await this.usersService.deleteUser(req.user.username);
      return userFound;
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
  }
}