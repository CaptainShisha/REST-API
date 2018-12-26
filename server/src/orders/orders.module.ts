import { Menu } from './../entity/Menu';
import { AuthService } from './../auth/auth.service';
import { JwtStrategy } from './../auth/jwt.strategy';
import { UsersService } from './../users/user.service';
import { ConfigService } from './../config/config.service';
import { ConfigModule } from './../config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { Order } from 'src/entity/Order';
import { OrdersService } from './orders.service';

@Module({imports: [TypeOrmModule.forFeature([Order]), PassportModule.register({ defaultStrategy: 'jwt' }),
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
controllers: [OrdersController],
providers: [OrdersService],
})
export class OrdersModule {}
