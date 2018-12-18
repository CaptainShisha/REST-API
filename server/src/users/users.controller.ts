import { UserRegisterDTO } from './../models/user-register.DTO';

import { UserDTO } from './../models/user.DTO';
import { Get, Controller, Body, Post, UseGuards, Param, ValidationPipe, HttpStatus, HttpException, Delete } from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get('')
  async getAll(@Body() body): Promise<UserDTO[]> {

      return await this.usersService.getAll();
  }

  @UseGuards(AuthGuard(), RolesGuard)
  @Get(':username')
  async getUser(@Param('username') param: string): Promise<UserRegisterDTO> {
    try {
    const userFound = await this.usersService.getByUsername(param);
    return userFound;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  @UseGuards(AuthGuard(), RolesGuard)
  @Delete (':username')
  async deleteUser(@Param('username') param: string) {
    try {
    const userFound = await this.usersService.deleteUser(param);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('')
  async addUser(@Body(new ValidationPipe ({
    transform: true,
    whitelist: true,
  })) user: UserRegisterDTO): Promise<string> {
    try {
      await this.usersService.registerUser(user);
      return JSON.stringify('Successful registration!');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
}