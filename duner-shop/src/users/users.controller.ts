import { UserValidationPipe } from './../pipes/user.validationPipe';
import { UserDTO } from './../models/user.DTO';
import { Get, Controller, Render, HttpCode, Req, Body, Post, Optional, UseGuards, Inject, UsePipes } from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard, PassportModule } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Add admin validation
  @UseGuards(AuthGuard())
  @Get('')
  getAll(): UserDTO[] {
      return this.usersService.getAll();
  }

  @Post('')
  @UsePipes(UserValidationPipe)
  addUser(@Body() user: UserDTO): void {
    this.usersService.add(user);
  }
}