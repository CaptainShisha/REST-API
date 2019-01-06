import { IsString, Length, Matches, IsEmail, IsNumberString } from 'class-validator';

export class UserRegisterDTO {
  @Length(2, 20)
  @IsString()
  username: string;
  @Length(6, 20)
  @IsString()
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)
  password: string;

  @IsString()
  @IsEmail()
  email: string;

  // Add firstname, lastname, address
  @Length(2, 15)
  @IsString()
  firstName: string;

  @Length(2, 20)
  @IsString()
  lastName: string;

  @Length(2, 30)
  @IsString()
  streetName: string;

  @Length(1, 4)
  @IsNumberString()
  streetNumber: string;

  @Length(10, 10)
  @IsNumberString()
  phoneNumber: string;
}
