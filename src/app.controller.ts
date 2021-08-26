import { Role } from './user/user.role.enum';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './auth/decorators/role.decorator';
import { RolesGuard } from './auth/guards/roles.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('protected')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getHello(@Request() req): string {
    return req.user;
  }
}
