import { UsersModule } from './users/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [UsersModule, MenuModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
