import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from 'src/user/user.role.enum';
import { RolesGuard } from '../guards/roles.guard';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
