import { UsersModule } from './users/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [UsersModule, MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
