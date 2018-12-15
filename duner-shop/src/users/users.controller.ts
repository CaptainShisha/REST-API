import { UserRegisterDTO } from './../models/user-register.DTO';

import { UserDTO } from './../models/user.DTO';
import { Get, Controller, Body, Post, UseGuards, Inject, UsePipes, ReflectMetadata, ValidationPipe, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Add admin validation
  @UseGuards(AuthGuard(), RolesGuard)
  @Get('')
  async getAll(@Body() body): Promise<UserDTO[]> {

      return await this.usersService.getAll();
  }

  @Post('register')
  async addUser(@Body(new ValidationPipe ({
    transform: true,
    whitelist: true,
  })) user: UserRegisterDTO): Promise<string> {
    try {
      await this.usersService.registerUser(user);
      return 'Successful registration!';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
}