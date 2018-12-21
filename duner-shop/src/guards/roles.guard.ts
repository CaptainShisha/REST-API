import { UsersService } from './../users/user.service';
import { Injectable, CanActivate, ExecutionContext, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()

export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector){}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const {user} = request;
    return user && user.isAdmin;
  }
}

//const rolesGuard = (role:string) => {
  //   return class implements CanActivate {
  
  //     constructor(private readonly reflector: Reflector){}
    
  //     canActivate(context: ExecutionContext): boolean {
  //       const request = context.switchToHttp().getRequest();
  //       const {user} = request;
  //       // const isAdmin = user.isAdmin;
  //       return user && user[role];// da se opravi
  //     }
  //   }
    
  // }
