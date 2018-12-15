import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ TypeOrmModule.forRoot(),
  UsersModule, MenuModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
