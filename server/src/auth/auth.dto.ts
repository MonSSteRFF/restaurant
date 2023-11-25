import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '../common/roleGuard/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'your_email' })
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'your_login' })
  readonly login: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'your_password' })
  readonly password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'additional key for create user with ADMIN role' })
  readonly additionalPassword?: string;
}

export class RegisterUserRoleDto {
  @IsNotEmpty()
  @IsEnum(Role)
  @ApiProperty({ enum: ['ADMIN', 'USER', 'RES_ADMIN', 'RES_USER'] })
  readonly role: Role;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'your_login or your_email' })
  readonly identifier: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'your_password' })
  readonly password: string;
}
