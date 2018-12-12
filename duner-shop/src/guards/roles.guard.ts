import { UsersService } from './../users/user.service';
import { Injectable, CanActivate, ExecutionContext, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const role = user.role;
    return user && role === 'admin';
  }
}
