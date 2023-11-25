import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '../common/roleGuard/role.enum';

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

  @IsString()
  @IsOptional()
  additionalPassword?: string;
}

export class RegisterUserRoleDto {
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  identifier: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
