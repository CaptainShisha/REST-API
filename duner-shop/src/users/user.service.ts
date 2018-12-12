import { JwtPayload } from './../auth/interfaces/jwt-payload';
import { UserDTO } from './../models/user.DTO';
import { Injectable, HttpException, HttpCode, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {

  private users: UserDTO[] = [
    { username: 'maria', password: 'ninjacode', role: 'admin' },
    { username: 'pesho', password: '12345', role: 'user' },
  ];

  getAll(): UserDTO[] {
    return this.users;
  }
  validateExistance(username: string): boolean {
    const usernames: string [] = this.users.map(x => x.username);
    return usernames.indexOf(username) >= 0;
  }

    getByUsername(username: string): UserDTO {
    const usernames: string [] = this.users.map(x => x.username);
    const userindex = usernames.indexOf(username);
    return this.users[userindex];
  }
  add(user: UserDTO): void {
    const usernames: string [] = this.users.map(x => x.username);
    if (usernames.indexOf(user.username) > 0) {
        throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    user.role = 'user';
    this.users.push(user);
  }
 validateUser(payload: JwtPayload): UserDTO {
    const userFound: UserDTO = this.getByUsername(payload.username);
    return userFound;
  }
  isLoggedIn(user: any) {
    return !!this.users.find(
      x =>
        x.username === user.username && x.password === user.password);
  }
}
