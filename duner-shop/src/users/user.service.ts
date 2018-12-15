import { JwtPayload } from './../auth/interfaces/jwt-payload';
import { UserDTO } from './../models/user.DTO';
import { Injectable, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './../entity/User';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { UserRegisterDTO } from 'src/models/user-register.DTO';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    ) { }

  async getAll() {
    return await this.usersRepository.find({});
  }
/*
  getByUsername(username: string): UserDTO {
    const usernames: string [] = this.users.map(x => x.username);
    const userindex = usernames.indexOf(username);
    return this.users[userindex];
  }
*/
  async registerUser(user: UserRegisterDTO) {
    const userFound = await this.usersRepository.findOne({ where: { username: user.username } });

    if (userFound) {
      throw new Error('User already exists');
    }

    user.password = await bcrypt.hash(user.password, 10);
    await this.usersRepository.create(user);

    const result = await this.usersRepository.save([user]);

    return result;
  }
  async validateUser(payload: JwtPayload): Promise<UserDTO> {
    const userFound: any = await this.usersRepository.findOne({ where: { username: payload.username } });
    return userFound;
  }

  async signIn(user: UserDTO): Promise<UserDTO> {
    const userFound: UserDTO = await this.usersRepository.findOne(
      { select: ['username', 'isAdmin', 'password'],
        where: { username: user.username } });
    console.log(userFound);
    if (userFound) {
      const result = await bcrypt.compare(user.password, userFound.password);
      if (result) {
        return userFound;
      }
    }

    return null;
  }
}
