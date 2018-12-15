import { ConfigService } from './../config/config.service';
import { ConfigModule } from './../config/config.module';
import { AuthService } from './../auth/auth.service';
import { JwtStrategy } from './../auth/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './user.service';
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/User';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secretOrPrivateKey: configService.jwtSecret,
      signOptions: {
        expiresIn: configService.jwtExpireTime,
      },
    }),
    inject: [ConfigService],
  }),
],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, AuthService],
})
export class UsersModule {}