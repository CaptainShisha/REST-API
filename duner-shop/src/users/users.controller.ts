import { UserValidationPipe } from './../pipes/user.validationPipe';
import { UserDTO } from './../models/user.DTO';
import { Get, Controller, Body, Post, UseGuards, Inject, UsePipes, ReflectMetadata } from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import bodyParser = require('body-parser');
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Add admin validation
  @UseGuards(AuthGuard(), RolesGuard)
  @Get('')
  getAll(@Body() body): UserDTO[] {

      return this.usersService.getAll();
  }

  @Post('')
  @UsePipes(UserValidationPipe)
  addUser(@Body() user: UserDTO): void {
    this.usersService.add(user);
  }
}