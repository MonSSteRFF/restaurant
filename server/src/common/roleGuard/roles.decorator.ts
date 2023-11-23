import { Role } from './role.enum';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from './role.guard';

export const Roles = (roles: Role[]) => {
  return (target, key?, descriptor?) => {
    SetMetadata('roles', roles)(target, key, descriptor);
    UseGuards(RolesGuard)(target, key, descriptor);
  };
};
