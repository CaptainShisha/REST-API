import { User } from './../entity/User';
import { Length, IsString, IsNumberString } from 'class-validator';
export class OrderDTO {
@IsNumberString()
  user_id: number;
}