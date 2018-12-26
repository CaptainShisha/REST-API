import { Menu } from './../entity/Menu';
import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu]), PassportModule.register({ defaultStrategy: 'jwt' }),
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
  controllers: [MenuController],
  providers: [MenuService],

})
export class MenuModule {}
