import { IsEmail, IsString } from 'class-validator';
import { Role } from '../../common/roleGuard/role.enum';

export class updateUserData {
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
