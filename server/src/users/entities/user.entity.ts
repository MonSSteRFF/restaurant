import { Role } from '../../common/roleGuard/role.enum';

export class User {
  id: number;
  login: string;
  email: string;
  password: string;
  role: Role;
  refreshToken?: string;
}
