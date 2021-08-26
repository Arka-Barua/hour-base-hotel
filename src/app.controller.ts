import { CurrentUser } from './auth/decorators/current-user.decorator';
import { Role } from './user/user.role.enum';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Auth } from './auth/decorators/auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('protected')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  @Auth(Role.ADMIN)
  getHello(@CurrentUser() user): string {
    return user;
  }
}
