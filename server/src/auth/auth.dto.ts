import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  login: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  identifier: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
