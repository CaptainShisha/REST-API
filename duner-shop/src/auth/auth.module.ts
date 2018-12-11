import { UsersService } from './../users/user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [ PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
    secretOrPrivateKey: 'iamhungry',
    signOptions: {
    expiresIn: 3600, // Entirely optional
    },
  })],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}