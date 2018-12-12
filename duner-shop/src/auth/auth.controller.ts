import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from 'src/users/user.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    private readonly usersService: UsersService) { }

  @Post('login')
  async login(@Body() user) {
    //console.log(this.usersService.getAll());
    if (this.usersService.isLoggedIn(user)) {
        return await this.authService.sign({ username: user.username });
    }
    else {
      return 'No such user!';
    }
  }
}