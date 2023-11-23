import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Role } from '../common/roleGuard/role.enum';

interface User {
  id: number;
  login: string;
  email: string;
  password: string;
  role: Role;
  refreshToken?: string;
}

export class CreateUserDto {
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

export class FindUserByDto {
  @IsNumber()
  id?: number;

  @IsString()
  login?: string;

  @IsString()
  email?: string;
}

export class UpdateUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  login?: string;

  @IsString()
  password?: string;

  @IsString()
  role?: Role;

  @IsString()
  refreshToken?: string;
}
