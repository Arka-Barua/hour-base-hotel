import { AuthService } from './../auth/auth.service';
import { UserService } from './user.service';
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { RegisterUserDto } from './user.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Post('/register')
  register(@Body() body: RegisterUserDto): Promise<any> {
    return this.userService.registerUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }
}
