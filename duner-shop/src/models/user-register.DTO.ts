import { IsString, Length, Matches, IsOptional, IsEmail } from 'class-validator';

export class UserRegisterDTO {
  @Length(2, 20)
  @IsString()
  username: string;
  @Length(5, 20)
  @IsString()
 // Disabled for testing purposes
 // @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)
  password: string;

  @IsEmail()
  email: string;

  // Add firstname, lastname, address
}
