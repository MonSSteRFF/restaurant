import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class createUserData {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  login: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  refreshToken?: string;
}
