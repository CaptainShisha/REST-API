import { AuthService } from './../auth/auth.service';
import { JwtStrategy } from './../auth/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './user.service';
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secretOrPrivateKey: 'iamhungry',
    signOptions: {
    expiresIn: 3600, // Entirely optional
    },
  }),
],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, AuthService],
})
export class UsersModule {}