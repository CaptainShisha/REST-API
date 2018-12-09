import { Length, IsString } from 'class-validator';
export class UserDTO {
  @Length(2, 20)
  @IsString()
  username: string;

  @Length(5, 20)
  @IsString()
  password: string;

  role?: string;

}